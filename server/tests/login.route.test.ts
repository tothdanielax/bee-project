const request = require("supertest");
const baseURL = "http://localhost:8080"

let conf = require("../config.json");
const user = conf.defaultUser;

describe("Login API", () => {

    describe("GET /api/login", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .get("/api/login")
                .then(response => expect(response.status).toEqual(404));
        });
    })

    describe("DELETE /api/login", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .delete("/api/login")
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("PUT /api/login", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .put("/api/login")
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("POST /api/login", () => {
        it("should return 403 FORBIDDEN on empty body", () => {
            return request(baseURL)
                .post("/api/login")
                .then(response => {
                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 403 FORBIDDEN on empty body 2", () => {
            return request(baseURL)
                .post("/api/login")
                .send({})
                .then(response => {
                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 403 FORBIDDEN on missing username", async () => {
            return request(baseURL)
                .post("/api/login")
                .send({password: "password"})
                .then(response => {
                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 403 FORBIDDEN on missing password", () => {
            return request(baseURL)
                .post("/api/login")
                .send({username: "username"})
                .then(response => {
                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 403 FORBIDDEN on 'wrong' username and password", () => {
            return request(baseURL)
                .post("/api/login")
                .send({username: user.username + "nope", password: user.password + "nope"})
                .then(response => {
                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        })

        it("should return 200 OK on 'good' username and password", () => {
            return request(baseURL)
                .post("/api/login")
                .send({username: user.username, password: user.password})
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({token: expect.any(String), authenticated: true});
                })
        })
    });
});


module.exports = {}