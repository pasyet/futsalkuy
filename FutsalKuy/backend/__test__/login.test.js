const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { hashingPassword } = require("../helpers/bcrypt-helpers");
const { verify } = require("../helpers/jwt-helpers");

let input = [
  {
    username: "rahayu",
    email: "rahayu@mail.com",
    password: hashingPassword("123456"),
    phoneNumber: "+62456789012",
    address: "Jl. Mawar",
    profilePic: "123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", input, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Users", input, {});
});

describe("testing endpoint login", () => {
  test("succes login", (done) => {
    const data = {
      email: "rahayu@mail.com",
      password: "123456",
    };
    request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(200)
      .then(({ body }) => {
        const verifyToken = verify(body.access_token);
        expect(verifyToken).toMatchObject({ id: 1, email: data.email });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("given wrong password, response 401", (done) => {
    const data = {
      email: "rahayu@mail.com",
      password: "lalal",
    };
    request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(401)
      .then(({ body }) => {
        // console.log(body.message);
        expect(body.message).toMatch("Invalid Password");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("email is not found, response 404", (done) => {
    const data = {
      email: "adi@mail.com",
      password: "budi123",
    };
    request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toMatch("Email or Password Not Found");
        done();
      })
      .catch((error) => {
        done(error);
        console.log(error);
      });
  });
});
