import * as faker from "faker";
import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../app";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    var fakeName = faker.name.findName();
    var fakeEmail = faker.internet.email();
    const response = await request(app).post("/users").send({
      email: fakeEmail,
      name: fakeName,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body["name"]).toBe(fakeName);
    expect(response.body["email"]).toContain(fakeEmail);
  });

  it("should not be able to create a user with already email exists", async () => {
    const emailAlreadyRegistered = "example@mail.com";

    await request(app).post("/users").send({
      email: emailAlreadyRegistered,
      name: faker.name.findName(),
    });
    const response = await request(app).post("/users").send({
      email: emailAlreadyRegistered,
      name: faker.name.findName(),
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("User already exists!");
  });

  it("should not be able to create a user without email", async () => {
    const response = await request(app).post("/users").send({
      email: "",
      name: faker.name.findName(),
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("email is a required");
  });

  it("should not be able to create an unnamed user attribute", async () => {
    const response = await request(app).post("/users").send({
      email: faker.internet.email(),
      name: "",
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("Name is required");
  });
});
