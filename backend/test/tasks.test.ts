import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { db } from "../src/database.js";

describe("Tasks API", () => {
  beforeEach(() => {
    db.getDb().prepare("DELETE FROM tasks").run();
  });

  afterEach(() => {
    db.getDb().prepare("DELETE FROM tasks").run();
  });

  describe("GET /api/v1/tasks", () => {
    it("should return empty array when no tasks exist", async () => {
      const response = await request(app).get("/api/v1/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return all tasks", async () => {
      db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Test Task", "Test Description", "pending");

      const response = await request(app).get("/api/v1/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe("Test Task");
    });
  });

  describe("GET /api/v1/tasks/:id", () => {
    it("should return a task by id", async () => {
      const result = db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Test Task", "Test Description", "pending");

      const response = await request(app).get(`/api/v1/tasks/${result.lastInsertRowid}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Test Task");
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).get("/api/v1/tasks/999");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });
  });

  describe("POST /api/v1/tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "New Task",
        description: "New Description",
        status: "pending"
      };

      const response = await request(app)
        .post("/api/v1/tasks")
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe(taskData.status);
      expect(response.body.id).toBeDefined();
    });

    it("should create a task with minimal data", async () => {
      const taskData = {
        title: "Minimal Task"
      };

      const response = await request(app)
        .post("/api/v1/tasks")
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.status).toBe("pending");
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .post("/api/v1/tasks")
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/v1/tasks/:id", () => {
    it("should update a task", async () => {
      const result = db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Original Task", "Original Description", "pending");

      const updateData = {
        title: "Updated Task",
        status: "done"
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${result.lastInsertRowid}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.status).toBe(updateData.status);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app)
        .put("/api/v1/tasks/999")
        .send({ title: "Updated" });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/v1/tasks/:id", () => {
    it("should delete a task", async () => {
      const result = db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Task to Delete", "Description", "pending");

      const response = await request(app).delete(`/api/v1/tasks/${result.lastInsertRowid}`);
      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).delete("/api/v1/tasks/999");
      expect(response.status).toBe(404);
    });
  });

  describe("GET /api/v1/done", () => {
    it("should return only done tasks", async () => {
      db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Done Task", "Description", "done");
      db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Pending Task", "Description", "pending");

      const response = await request(app).get("/api/v1/done");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe("done");
    });
  });

  describe("GET /api/v1/pending", () => {
    it("should return only pending tasks", async () => {
      db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Done Task", "Description", "done");
      db.getDb().prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)")
        .run("Pending Task", "Description", "pending");

      const response = await request(app).get("/api/v1/pending");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe("pending");
    });
  });
});
