const request = require("supertest");
const app = require("../app");

let articleIds = [];
let adminToken;

beforeAll(async () => {
  // Create admin user and get token

  const loginResponse = await request(app).post("/user/login").send({
    email: "adminexample.com",
    password: "12345",
  });

  adminToken = loginResponse.body.access_token;

  // Create a category for testing
  await request(app)
    .post("/categories/add")
    .send({ name: "Test Category" })
    .set("authorization", "authorizationAdmin", `${adminToken}`);

  // Create 20 articles for testing
  for (let i = 1; i <= 20; i++) {
    const response = await request(app)
      .post("/articles/add")
      .send({
        title: `Test Article ${i}`,
        content: `Content of test article ${i}`,
        imgUrl: `http://example.com/image${i}.jpg`,
        categoryId: 1, // Assuming the category ID is 1, adjust as needed
      })
      .set("authorization", `${adminToken}`);
    articleIds.push(response.body.id);
  }
});

afterAll(async () => {
  // Clean up database
  await request(app)
    .delete("/categories/1/delete")
    .set("uthorization", `${adminToken}`);
  for (const id of articleIds) {
    await request(app)
      .delete(`/articles/${id}`)
      .set("authorization",  `${adminToken}`);
  }

});

describe("GET /pub/articles", () => {
  test("should successfully get all articles without query parameters", async () => {
    const response = await request(app).get("/pub/articles");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Check if we get all 20 articles
  });

  test("should successfully get all articles with query filter parameter", async () => {
    const response = await request(app)
      .get("/pub/articles")
      .query({ search: "Test Article 1" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
    expect(response.body[0]).toHaveProperty("title", "Test Article 1");
  });

  test("should successfully get articles with pagination", async () => {
    const response = await request(app).get("/pub/articles").query({ page: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0); // Assuming page size is 10
  });
});

describe("GET /pub/articles/:id", () => {
  test("should successfully get an article by id", async () => {
    const response = await request(app).get(`/pub/articles/${articleIds[0]}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Test Article 1");
  });

  test("should fail to get an article by invalid id", async () => {
    const response = await request(app).get(`/pub/articles/99999`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Data Not Found");
  });
});
