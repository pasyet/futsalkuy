const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { sign } = require("../helpers/jwt-helpers");
const { hashingPassword } = require("../helpers/bcrypt-helpers");

user1 = [
  {
    username: "widia",
    email: "widia@mail.com",
    password: hashingPassword("123456"),
    phoneNumber: "+62456789012",
    address: "Jl. Tulip",
    profilePic: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let access_token_1;

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", user1, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Users", user1, {});

  access_token_1 = sign({ id: 2, email: user1[0].email });
});

describe("testing endpoint profile /profile", () => {
  test(`successfully get user has been login`, (done) => {
    request(app)
      .get("/profile")
      .set("access_token", access_token_1)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("testing endpoint profile /profile/:id", () => {
  test(`successfuly get one user`, (done) => {
    request(app)
      .get("/profile/1")
      .set("access_token", access_token_1)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("testing endpoint profile /profile", () => {
  test(`failed to get user because doesnt has access token`, (done) => {
    request(app)
      .get("/profile")
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toEqual("Missing Access Token");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("testing endpoint profile /profile/:id", () => {
  test(`successfuly update profile`, (done) => {
    request(app)
      .put(`/profile/1`)
      .set("access_token", access_token_1, "Content-Type", "application/json")
      .send({
        username: "widia-1",
        phoneNumber: "+6281234567",
        address: "Jl. Tulip",
        profilePic: "cccc",
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          username: "widia-1",
          phoneNumber: "+6281234567",
          address: "Jl. Tulip",
          profilePic: "cccc",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("testing endpoint profile /profile/:id", () => {
  test(`cannot get user id`, (done) => {
    request(app)
      .get("/profile/4")
      .set("access_token", access_token_1)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Data Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("testing endpoint profile /profile/:id", () => {
  test(`failed update profile`, (done) => {
    request(app)
      .put(`/profile/1`)
      .set("access_token", access_token_1, "Content-Type", "application/json")
      .send({
        username: "",
        phoneNumber: "+6281234567",
        address: "Jl. Tulip",
        profilePic: "cccc",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual(["username is required"]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
