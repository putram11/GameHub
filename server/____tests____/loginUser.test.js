const request = require('supertest');
const app = require('../app');

let adminUser;

beforeAll(async () => {
  // Create admin user
  const adminResponse = await request(app).post('/user/add-user').send({
    username: 'adminuser',
    email: 'adminuser@example.com',
    password: 'password',
    role: 'Admin',
  });
  adminUser = adminResponse.body;
});

afterAll(async () => {
  // Clean up database
  const loginResponse = await request(app).post('/user/login').send({
    email: 'adminuser@example.com',
    password: 'password',
  });
  const adminToken = loginResponse.body.access_token;

  await request(app)
    .delete(`/user/${adminUser.id}`)
    .set('Authorization', `Bearer ${adminToken}`);
});

describe('POST /login', () => {
  test('should fail if email is not provided', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ password: 'password' });

    expect(response.status).toBe(401); 
    expect(response.body).toHaveProperty(
      'error',
      'Please Insert your email and password'
    );
  });

  test('should fail if password is not provided', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'adminuser@example.com' });

    expect(response.status).toBe(401); // Change to 400 Bad Request
    expect(response.body).toHaveProperty(
      'error',
      'Please Insert your email and password'
    );
  });

  test('should fail if email is invalid', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'invalid@example.com', password: 'password' });

    expect(response.status).toBe(401); // 
    expect(response.body).toHaveProperty(
      'error',
      'Please Insert your email and password'
    );
  });

  test('should fail if password is incorrect', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'adminuser@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401); // Change to 401 Unauthorized
    expect(response.body).toHaveProperty(
      'error',
      'Please Insert your email and password'
    );
  });

  test('should succeed if credentials are correct', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'admin@example.com', password: '12345' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });
});
