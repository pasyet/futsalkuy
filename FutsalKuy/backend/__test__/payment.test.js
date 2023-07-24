const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

let inputEvent = [
  {
    event_name: "Group 1",
    date: new Date(),
    people: "10",
    fieldId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    event_name: "Group 2",
    date: new Date(),
    people: "10",
    fieldId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let inputField = [
  {
    field_name: "SportPackers Legacy",
    field_type: "Futsal Rumput Sintetis",
    price: 250000,
    providerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    field_name: "SportPackers Legacy",
    field_type: "Futsal Hybrid Finil",
    price: 250000,
    providerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    field_name: "Champion Futsal",
    field_type: "Futsal Hybrid Finil",
    price: "250000",
    providerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    field_name: "Champion Futsal",
    field_type: "Futsal Rumput Sintetis",
    price: "250000",
    providerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkDelete("Events", inputEvent, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Fields", inputField, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  
  await queryInterface.bulkInsert("Events", inputEvent, {});
  await queryInterface.bulkInsert("Fields", inputField, {});
});

describe("testing endpoint post /payment", () => {
  test("success createPayment", (done) => {
    const data = {
      fieldId: 1,
      eventId: 1,
    };
    request(app)
      .post("/payment")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("failed 400", (done) => {
    const data = {
      fieldId: 99,
      eventId: 99,
    };
    request(app)
      .post("/payment")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  //   test("memberikan password yang salah, response 401", (done) => {
  //     const data = {
  //       email: "rahayu@mail.com",
  //       password: "lalal",
  //     };
  //     request(app)
  //       .post("/login")
  //       .set("Content-Type", "application/json")
  //       .send(data)
  //       .expect(401)
  //       .then(({ body }) => {
  //         // console.log(body.message);
  //         expect(body.message).toMatch("Invalid Password");
  //         done();
  //       })
  //       .catch((error) => {
  //         done(error);
  //       });
  //   });

  //   test("email yang diinput tidak terdaftar di database, response 404", (done) => {
  //     const data = {
  //       email: "adi@mail.com",
  //       password: "budi123",
  //     };
  //     request(app)
  //       .post("/login")
  //       .set("Content-Type", "application/json")
  //       .send(data)
  //       .expect(404)
  //       .then(({ body }) => {
  //         expect(body.message).toMatch("Email or Password Not Found");
  //         done();
  //       })
  //       .catch((error) => {
  //         done(error);
  //         console.log(error);
  //       });
  //   });
});

describe("testing endpoint post /payment", () => {
  test("success createPayment", (done) => {
    request(app)
      .get("/payment/1")
      .set("Content-Type", "application/json")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("failed 400", (done) => {
    request(app)
      .get("/payment/99")
      .set("Content-Type", "application/json")
      .expect(400)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
