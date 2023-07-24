const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { hashingPassword } = require("../helpers/bcrypt-helpers");

let inputEvent = [
  {
    event_name: "Group 1",
    date: new Date(),
    people: "10",
    fieldId: "1",
    status: "waiting",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    event_name: "Group 2",
    date: new Date(),
    people: "10",
    fieldId: "2",
    status: "waiting",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let inputUser = [
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

let inputParticipant = [
  {
    userId: 2,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 3,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 5,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 6,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 7,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 8,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 9,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 10,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 11,
    eventId: 2,
    role: "participant",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", inputUser, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Users", inputUser, {});

  await queryInterface.bulkDelete("Participants", inputParticipant, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Participants", inputParticipant, {});

  await queryInterface.bulkDelete("Events", inputEvent, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert("Events", inputEvent, {});
});

describe("testing endpoint post /participant", () => {
  test("success post /participant", (done) => {
    const data = {
      userId: 1,
      eventId: 1,
      role: "participant",
    };
    request(app)
      .post("/participant")
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

  test("failed 400 not complete request body", (done) => {
    const data = {
      eventId: 1,
    };
    request(app)
      .post("/participant")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("failed 400 because already participant", (done) => {
    const data = {
      userId: 1,
      eventId: 1,
      role: "participant",
    };
    request(app)
      .post("/participant")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Already participant");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("failed 400 because event already full", (done) => {
    const data = {
      userId: 1,
      eventId: 2,
      role: "participant",
    };
    request(app)
      .post("/participant")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Event participant is max");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test("failed 404 because event status waiting not found", (done) => {
    const data = {
      userId: 1,
      eventId: 100,
      role: "participant",
    };
    request(app)
      .post("/participant")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.message).toBe("Event with status waiting not found");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
