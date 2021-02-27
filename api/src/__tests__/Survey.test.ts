import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../app";
import * as faker from 'faker';

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: faker.name.title(),
      description: faker.random.words(),
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: faker.name.title(),
      description: faker.random.words(),
    });
    const response = await request(app).get("/surveys");
    expect(response.body.length).toBe(2);
  });

  it("should not be able to create a new survey without title", async () => {
    const response = await request(app).post("/surveys").send({
      title: "",
      description: faker.random.words(),

    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("title is a required");
  });

  it("should not be able to create a new survey without description", async () => {
    const response = await request(app).post("/surveys").send({
      title: faker.name.title(),
      description: "",
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("description is a required");
  });
});
