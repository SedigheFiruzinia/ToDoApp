const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("tasks are returned as json", async () => {
  await api
    .get("/api/tasks")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are seven tasks", async () => {
  const response = await api.get("/api/tasks");
  expect(response.body).toHaveLength(7);
});

test("the first task is about test backend", async () => {
  const response = await api.get("/api/tasks");

  expect(response.body[0].text).toBe("test backend");
});

test("a specific task is within the returned tasks", async () => {
  const response = await api.get("/api/tasks");

  const texts = response.body.map((r) => r.text);
  expect(texts).toContain("design frontend");
});

test("fails if updating an unexisted task", async () => {
  await api.put("/api/tasks/80").expect(404);
});
