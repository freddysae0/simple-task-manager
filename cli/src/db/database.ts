import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { Task, CreateTask, UpdateTask } from '../types/task';

export class TaskDatabase {
  private db: sqlite3.Database;

  constructor(dbPath?: string) {
    const defaultPath = path.join(process.cwd(), 'backend', 'tasks.db');
    const altPath = path.join(process.cwd(), '..', 'backend', 'tasks.db');
    
    // Try to determine the correct path based on current working directory
    const finalPath = dbPath || (fs.existsSync(defaultPath) ? defaultPath : altPath);
    
    this.db = new sqlite3.Database(finalPath);
    this.initDatabase();
  }

  private initDatabase(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  getAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err: Error | null, rows: any) => {
        if (err) reject(err);
        else resolve(rows as Task[]);
      });
    });
  }

  getTaskById(id: number): Promise<Task | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM tasks WHERE id = ?', [id], (err: Error | null, row: any) => {
        if (err) reject(err);
        else resolve(row as Task | undefined);
      });
    });
  }

  createTask(task: CreateTask): Promise<Task> {
    return new Promise((resolve, reject) => {
      const db = this.db;
      const stmt = db.prepare(`
        INSERT INTO tasks (title, description, status) 
        VALUES (?, ?, COALESCE(?, 'pending'))
      `);
      stmt.run([task.title, task.description || null, task.status || null], function(this: any, err: Error | null, result: any) {
        if (err) {
          stmt.finalize();
          reject(err);
        } else {
          // Get the created task using captured db instance
          db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err: Error | null, row: any) => {
            stmt.finalize();
            if (err) reject(err);
            else resolve(row as Task);
          });
        }
      });
    });
  }

  updateTask(id: number, updates: UpdateTask): Promise<Task | undefined> {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      
      if (updates.title !== undefined) {
        fields.push('title = ?');
        values.push(updates.title);
      }
      if (updates.description !== undefined) {
        fields.push('description = ?');
        values.push(updates.description);
      }
      if (updates.status !== undefined) {
        fields.push('status = ?');
        values.push(updates.status);
      }
      
      if (fields.length === 0) {
        this.getTaskById(id).then(resolve).catch(reject);
        return;
      }
      
      fields.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);
      
      const db = this.db;
      const stmt = db.prepare(`
        UPDATE tasks SET ${fields.join(', ')} WHERE id = ?
      `);
      stmt.run(values, (err: Error | null) => {
        stmt.finalize();
        if (err) {
          reject(err);
        } else {
          this.getTaskById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  deleteTask(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = this.db;
      db.run('DELETE FROM tasks WHERE id = ?', [id], function(this: any, err: Error | null) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
