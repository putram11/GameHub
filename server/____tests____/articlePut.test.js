const request = require("supertest");
const app = require("../app");

let adminToken, staffToken, otherStaffToken, articleId;

beforeAll(async () => {
  // Create admin user and get token
  await request(app).post("/user/add-user").send({
    username: "adminuser",
    email: "adminuser@example.com",
    password: "password",
    role: "Admin",
  });
  let loginResponse = await request(app).post("/user/login").send({
    email: "adminuser@example.com",
    password: "password",
  });
  adminToken = loginResponse.body.access_token;

  // Create a staff user and get token
  await request(app).post("/user/add-user").send({
    username: "staffuser",
    email: "staffuser@example.com",
    password: "password",
    role: "Staff",
  });
  loginResponse = await request(app).post("/user/login").send({
    email: "staffuser@example.com",
    password: "password",
  });
  staffToken = loginResponse.body.access_token;

  // Create another staff user and get token
  await request(app).post("/users/add-user").send({
    username: "otherstaffuser",
    email: "otherstaffuser@example.com",
    password: "password",
    role: "Staff",
  });
  loginResponse = await request(app).post("/user/login").send({
    email: "otherstaffuser@example.com",
    password: "password",
  });
  otherStaffToken = loginResponse.body.access_token;

  // Create a category for testing
  await request(app)
    .post("/categories")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "Test Category" });

  // Create an article for testing
  const response = await request(app)
    .post("/articles/")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      title: "Test Article",
      content: "This is a test article",
      imgUrl: "http://example.com/image.jpg",
      categoryId: 1,
    });
  articleId = response.body.id;
});

afterAll(async () => {
  // Clean up database
  const loginResponse = await request(app).post("/user/login").send({
    email: "adminuser@example.com",
    password: "password",
  });
  const adminToken = loginResponse.body.access_token;

  const response = await request(app)
    .get("/user")
    .set("Authorization", `Bearer ${adminToken}`);
  const users = response.body;
  

  await request(app).delete("/categories/1").set("Authorization", `Bearer ${adminToken}`);
});

describe("PUT /articles/:id", () => {
  test("should succeed in updating an article", async () => {
    const response = await request(app)
      .put(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Article",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Article");
    expect(response.body.content).toBe("This is an updated test article");
  });

  test("should fail to update article if not logged in", async () => {
    const response = await request(app)
      .put(`/articles/${articleId}`)
      .send({
        title: "Updated Article",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  test("should fail to update article with invalid token", async () => {
    const response = await request(app)
      .put(`/articles/${articleId}`)
      .set("Authorization", "Bearer invalidtoken")
      .send({
        title: "Updated Article",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });

  test("should fail to update article with non-existing id", async () => {
    const response = await request(app)
      .put(`/articles/99999`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Article",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });

  test("should fail to update article if staff tries to update article they do not own", async () => {
    const response = await request(app)
      .put(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${otherStaffToken}`)
      .send({
        title: "Updated Article",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });

  test("should fail to update article with invalid request body", async () => {
    const response = await request(app)
      .put(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "",
        content: "This is an updated test article",
        imgUrl: "http://example.com/updatedimage.jpg",
        categoryId: 1,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid token");
  });
});
