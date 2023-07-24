const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

let inputProvider = [
  {
    provider_name: "SportPackers Legacy",
    location:
      "Jln. Mangga 17 Utama P1/354-357, Kepaduri Jakarta Barat, Kota Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    provider_name: "Champion Futsal",
    location:
      "Jl. Rw. Belong No.13, Rt.1/rw.9, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530, Kota Jakarta Barat",
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
  await queryInterface.bulkDelete("Providers", inputProvider, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Providers", inputProvider, {});

  await queryInterface.bulkDelete("Fields", inputField, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Fields", inputField, {});
});

describe("testing endpoint get /field", () => {
  test("success get all field ", (done) => {
    request(app)
      .get("/field")
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
});

describe("testing endpoint get /field/:id", () => {
  test("success get field by id", (done) => {
    request(app)
      .get("/field/1")
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

  test("failed 404", (done) => {
    request(app)
      .get("/field/99")
      .set("Content-Type", "application/json")
      .expect(404)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
