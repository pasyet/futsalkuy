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

describe("testing endpoint providers /providers", () => {
    test('successfully get all providers', (done) => {
        request(app)
            .get("/providers")
            .expect(200)
            .then(({body}) => {
                expect(body).toBeDefined();
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("testing endpoint providers /providers/:id", () => {
    test('successfully get provider by id', (done) => {
        request(app)
            .get("/provider/1")
            .expect(200)
            .then(({body}) => {
                expect(body).toBeDefined();
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("testing endpoint providers /providers/:id", () => {
    test('failed get provider by id', (done) => {
        request(app)
            .get("/provider/4")
            .set("Content-Type", "application/json")
            .expect(404)
            .then(({body}) => {
                console.log(body);
                expect(body.message).toEqual('Data Not Found')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})