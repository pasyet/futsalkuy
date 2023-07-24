const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { hashingPassword } = require("../helpers/bcrypt-helpers");


let user1 = [
  {
    username: "dia",
    email: "dia@mail.com",
    password: hashingPassword("12345"),
    phoneNumber: "+62456789012",
    address: "Jl. Mawar",
    profilePic: "aaaaa",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let user2 = [
  {
    username: "widia",
    email: "widia@mail.com",
    password: hashingPassword("12345"),
    phoneNumber: "+62456789012",
    address: "Jl. Tulip",
    profilePic: "bbbbb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let user3 = [
  {
    username: "widi",
    email: "widi@mail.com",
    password: hashingPassword("12345"),
    phoneNumber: "+62456789012",
    address: "Jl. Cempaka",
    profilePic: "bbbbb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let events = [
  {
    event_name: "Group 1",
    date: new Date(),
    time: "13:00",
    status: "Waiting",
    people: "10",
    fieldId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    event_name: "Group 2",
    date: new Date(),
    time: "17:00",
    status: "Waiting",
    people: "10",
    fieldId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let participants = [
  {
    userId: 1,
    eventId: 2,
    role: "Host",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    eventId: 1,
    role: "Host",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 3,
    eventId: 1,
    role: "Participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", user1, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", user2, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", user3, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Events", events, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Participants", participants, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Providers", inputProvider, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Fields", inputField, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Events", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Users", user1, {});
  await queryInterface.bulkInsert("Users", user2, {});
  await queryInterface.bulkInsert("Users", user3, {});
  await queryInterface.bulkInsert("Events", events, {});
  await queryInterface.bulkInsert("Participants", participants, {});
  await queryInterface.bulkInsert("Providers", inputProvider, {});
  await queryInterface.bulkInsert("Fields", inputField, {});
});

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

describe("testing endpoint /event", () => {
    test("successfully get events", (done) => {
        request(app)
            .get("/events")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined()
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})

describe("testing endpoint /event/:id", () => {
    test("successfully get 1 event", (done) => {
        request(app)
            .get("/event/2")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined()
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})

describe("testing endpoint /event/:id", () => {
    test("failed get 1 event because eventId not found", (done) => {
        request(app)
            .get("/event/4")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toEqual('Data Not Found')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})

describe('testing endpoint event /event/:id', () => {
    test(`successfuly update status event`, (done) => {
        request(app)
            .patch("/event/2")
            .set("Content-Type", "application/json")
            .send({
                status: "Active"
            })
            .expect(200)
            .then(({ body }) => {
                expect(body.status).toMatchObject({
                    status: 'Active',
                });
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})


describe("testing endpoint post event", () => {
  test("success create event", (done) => {
    const data = {
      event_name: "testing",
      userId: 1,
      fieldId: 1,
      date: "2022-06-30T07:34:48.188Z",
    };
    request(app)
      .post("/event")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

