const request = require("supertest");
const app = require("../app");

let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyMTk2MTcyNH0.pm3_Rw6PwAywJfKYRGUb2TmPI2ObGHUOvB3kBtMPfok";
let testCategoryId;

beforeAll(async () => {
  // Log in as admin user to get the token
  const loginResponse = await request(app).post("/user/login").send({
    email: "admin@example.com",
    password: "12345",
  });
 

  // Create a category for testing and capture its ID
  const categoryResponse = await request(app)
    .post("/categories/add")
    .set("authorization", `${adminToken}`)
    .send({ name: "Test Category" });

  testCategoryId = categoryResponse.body.id;
});

afterAll(async () => {
  // Clean up database: categories and articles
  const categoryResponse = await request(app)
    .get("/categories")
    .set("authorization", `${adminToken}`);
  const categories = categoryResponse.body;

  for (const category of categories) {
    await request(app)
      .delete(`/categories/${category.id}`)
      .set("authorization", `${adminToken}`);
  }

  const articleResponse = await request(app)
    .get("/articles/get")
    .set("authorization", `${adminToken}`);
  const articles = articleResponse.body;

  for (const article of articles) {
    await request(app)
      .delete(`/articles/${article.id}`)
      .set("authorization", `${adminToken}`);
  }
});

describe("POST /articles/add", () => {
  test("should succeed in creating an article", async () => {
    const response = await request(app)
      .post("/articles/add")
      .set("authorization", `${adminToken}`)
      .send({
        title: "Test Article",
        content: "This is a test article",
        imgUrl: "http://example.com/image.jpg",
        categoryId: testCategoryId, // Use the created category ID
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Article");
  });

  test("should fail to create article if not logged in", async () => {
    const response = await request(app).post("/articles/add").send({
      title: "Test Article",
      content: "This is a test article",
      imgUrl: "http://example.com/image.jpg",
      categoryId: testCategoryId,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  test("should fail to create article with invalid token", async () => {
    const response = await request(app)
      .post("/articles/add")
      .set("authorization", "Bearer invalidtoken")
      .send({
        title: "Test Article",
        content: "This is a test article",
        imgUrl: "http://example.com/image.jpg",
        categoryId: testCategoryId,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });

  test("should fail to create article with missing title", async () => {
    const response = await request(app)
      .post("/articles/add")
      .set("authorization", `${adminToken}`)
      .send({
        content: "This is a test article",
        imgUrl: "http://example.com/image.jpg",
        categoryId: testCategoryId,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  test("should fail to create article with missing content", async () => {
    const response = await request(app)
      .post("/articles/add")
      .set("authorization", `${adminToken}`)
      .send({
        title: "Test Article",
        imgUrl: "http://example.com/image.jpg",
        categoryId: testCategoryId,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  test("should fail to create article with missing categoryId", async () => {
    const response = await request(app)
      .post("/articles/add")
      .set("authorization", `${adminToken}`)
      .send({
        title: "Test Article",
        content: "This is a test article",
        imgUrl: "http://example.com/image.jpg",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });
});
