const request = require("supertest");
const app = require("../app");

let adminToken, staffToken, otherStaffToken, articleId;

beforeAll(async () => {
  // Create admin user and get token
  await request(app).post("/user/add-user").send({
    username: "adminuser",
    email: "admin@example.com",
    password: "12345",
    role: "Admin",
  });
  let loginResponse = await request(app).post("/user/login").send({
    email: "admin@example.com",
    password: "12345",
  });
  adminToken = loginResponse.body.access_token;

  // Create a staff user and get token
  await request(app).post("/user/add-user").send({
    username: "staffuser",
    email: "staffuser@example.com",
    password: "12345",
    role: "Staff",
  });
  loginResponse = await request(app).post("/user/login").send({
    email: "staffuser@example.com",
    password: "12345",
  });
  staffToken = loginResponse.body.access_token;

  // Create another staff user and get token
  await request(app).post("/user/add-user").send({
    username: "otherstaffuser",
    email: "otherstaffuser@example.com",
    password: "12345",
    role: "Staff",
  });
  loginResponse = await request(app).post("/user/login").send({
    email: "otherstaffuser@example.com",
    password: "12345",
  });
  otherStaffToken = loginResponse.body.access_token;

  // Create a category for testing
  const categoryResponse = await request(app)
    .post("/categories/add")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "Test Category" });

  // Create an article for testing
  const articleResponse = await request(app)
    .post("/articles/add")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      title: "Test Article",
      content: "This is a test article",
      imgUrl: "http://example.com/image.jpg",
      categoryId: categoryResponse.body.id,
    });
  articleId = articleResponse.body.id;
});

afterAll(async () => {
  // Clean up database
  const response = await request(app)
    .get("/user")
    .set("Authorization", `Bearer ${adminToken}`);
  const users = response.body;

  for (const user of users) {
    await request(app)
      .delete(`/user/${user.id}`)
      .set("Authorization", `Bearer ${adminToken}`);
  }

  const categoryResponse = await request(app)
    .get("/categories")
    .set("Authorization", `Bearer ${adminToken}`);
  const categories = categoryResponse.body;

  for (const category of categories) {
    await request(app)
      .delete(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${adminToken}`);
  }
});

describe("DELETE /articles/:id", () => {
  test("should succeed in deleting an article", async () => {
    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Article successfully deleted"
    );
  });

  test("should fail to delete article if not logged in", async () => {
    const response = await request(app).delete(`/articles/${articleId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  test("should fail to delete article with invalid token", async () => {
    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });

  test("should fail to delete article with non-existing id", async () => {
    const response = await request(app)
      .delete(`/articles/99999`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Data Not Found");
  });

  test("should fail to delete article if staff tries to delete article they do not own", async () => {
    // Create an article with staff user
    const response = await request(app)
      .post("/articles/add")
      .set("Authorization", `Bearer ${staffToken}`)
      .send({
        title: "Staff Article",
        content: "This is a staff article",
        imgUrl: "http://example.com/staffimage.jpg",
        categoryId: 1,
      });
    const staffArticleId = response.body.id;

    const deleteResponse = await request(app)
      .delete(`/articles/${staffArticleId}`)
      .set("Authorization", `Bearer ${otherStaffToken}`);

    expect(deleteResponse.status).toBe(401);
    expect(deleteResponse.body).toHaveProperty("error", "Invalid token");

    // Clean up created staff article
    await request(app)
      .delete(`/articles/${staffArticleId}`)
      .set("Authorization", `Bearer ${staffToken}`);
  });
});
