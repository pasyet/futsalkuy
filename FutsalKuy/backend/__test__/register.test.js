const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("testing endpoint register", () => {
  test("successfully register", (done) => {
    const data = {
      email: "coba@mail.com",
      password: "123456",
      username: "coba",
      phoneNumber: "123456",
      address: "jalancoba",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({ id: 1, email: data.email });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
})

describe("testing endpoint register", () => {
  test("failed regist data because one of field are empty", (done) => {
    const data = {
      password: "123456",
      username: "coba",
      phoneNumber: "123456",
      address: "jalancoba",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch("email is required");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
})

describe("testing endpoint register", () => {
  test("failed regist data because one of field are empty string", (done) => {
    const data = {
      email: "",
      password: "123456",
      username: "coba",
      phoneNumber: "123456",
      address: "jalancoba",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch("email is required");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
})

describe("testing endpoint register", () => {
  test("failed because not entering password", (done) => {
    const data = {
      email: "coba@mail.com",
      username: "coba",
      phoneNumber: "123456",
      address: "jalancoba",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch("password is required");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
})

describe("testing endpoint register", () => {
  test("some parameter not send, response 400", (done) => {
    const data = {
      email: "coba2@mail.com",
      password: "123456",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
})

describe("testing endpoint register", () => {
  test("wrong format mail", (done) => {
    const data = {
      email: "cobamail.com",
      password: "123456",
      username: "coba",
      phoneNumber: "123456",
      address: "jalancoba",
    };
    request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch("invalid format mail");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
