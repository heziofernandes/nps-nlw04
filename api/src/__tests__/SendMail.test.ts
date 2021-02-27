import * as faker from "faker";
import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../app";

describe("Send Mail", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should not be able to send email without survey registered", async () => {
    const surveyIdNonexistentInDB = faker.random.uuid();
    const emailExistentInDB = faker.internet.email();

    await request(app).post("/users").send({
      email: emailExistentInDB,
      name: faker.name.firstName(),
    });
    const response = await request(app).post("/sendMail").send({
      email: emailExistentInDB,
      survey_id: surveyIdNonexistentInDB,
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("Survey does not exists");
  });

  it("should not be able to send mail with empty survey_id", async () => {
    const response = await request(app).post("/sendMail").send({
      email: faker.internet.email(),
      survey_id: "",
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("survey_id is a required");
  });

  it("should not be able to send mail without attribute email", async () => {
    const response = await request(app).post("/sendMail").send({
      email: "",
      survey_id: faker.random.uuid(),
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("email is a required");
  });
});
