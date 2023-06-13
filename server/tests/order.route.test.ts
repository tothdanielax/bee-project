const request = require("supertest")
const baseURL = "http://localhost:8080"

let conf = require("../config.json");
const user = conf.defaultUser;
let token: string;

beforeAll(() => {
    return request(baseURL).post("/api/login").send(user).then(response => {
        token = response.body.token;
    });
});

describe("Order API", () => {

    describe("GET /api/order", () => {
        it("should return 401 NOT AUTH for get", () => {
            return request(baseURL)
                .get("/api/order")
                .then(response => expect(response.status).toEqual(401));
        });

        it("should return 200 OK with auth", () => {
            return request(baseURL)
                .get("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .then(response => expect(response.status).toEqual(200));
        });
    })

    describe("DELETE /api/order", () => {
        it("should return 404 NOT FOUND for delete", () => {
            return request(baseURL)
                .delete("/api/order")
                .then(response => expect(response.status).toEqual(404));
        });

        it("should return 404 NOT FOUND with auth ", () => {
            return request(baseURL)
                .delete("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("PUT /api/order", () => {
        it("should return 404 NOT FOUND for put", () => {
            return request(baseURL)
                .put("/api/order")
                .then(response => expect(response.status).toEqual(404));
        });

        it("should return 404 NOT FOUND with token", () => {
            return request(baseURL)
                .put("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("POST /api/order", () => {
        it("should return 401 NOT AUTHENTICATED without token", () => {
            return request(baseURL)
                .post("/api/order")
                .then(response => expect(response.status).toEqual(401));
        });

        it("should return 400 BAD REQUEST on empty body", () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .then(response => {
                    expect(response.status).toEqual(400);
                })
        });

        it("should return 400 BAD REQUEST on empty body 2", () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({})
                .then(response => {
                    expect(response.status).toEqual(400);
                })
        });

        it("should return 400 BAD REQUEST on invalid body", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({" ": 2})
                .then(response => {
                    expect(response.status).toEqual(400);
                })
        });

        it("should return 400 BAD REQUEST on object", async () => {
            const item = "Akác";
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: {[item]: ""}})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on non-integer value", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: "asd"}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on 0 or negative value", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: -1}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on 100+ value", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 101}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on non-integer value (float) 2", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 1.1}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on non-integer value as 2nd element", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 2}, {honey: "Hárs", quantity: '1asd'}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on 0 or negative value as 2nd element", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 2}, {honey: "Hárs", quantity: -1}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on 100+ value as 2nd element", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 2}, {honey: "Hárs", quantity: 101}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });

        it("should return 400 BAD REQUEST on non-integer value (float) as 2nd element", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 2}, {honey: "Hárs", quantity: 1.1}]})
                .then(response => {
                    expect(response.status).toEqual(400);
                });
        });


        it("should return 200 OK on valid request", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 1}, {honey: "Hárs", quantity: 1}]})
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({status: "order successful"})
                });
        });

        it("should return 200 OK on valid request 2", async () => {
            return request(baseURL)
                .post("/api/order")
                .set('Authorization', 'Bearer ' + token)
                .send({elements: [{honey: "Akác", quantity: 1}, {honey: "Hárs", quantity: 1}]})
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({status: "order successful"})
                });
        });
    })
});

module.exports = {}