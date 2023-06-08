const request = require("supertest");
const baseURL = "http://localhost:8080"
const url = "/api/register";

let conf = require("../config.json");
const user = conf.defaultUser;

describe("Login API", () => {

    describe("GET /api/register", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .get(url)
                .then(response => expect(response.status).toEqual(404));
        });
    })

    describe("DELETE /api/register", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .delete(url)
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("PUT /api/register", () => {
        it("should return 404 NOT FOUND", () => {
            return request(baseURL)
                .put(url)
                .then(response => expect(response.status).toEqual(404));
        });
    });

    describe("POST /api/register", () => {
        it("should return 400 BAD REQUEST on empty body", () => {
            return request(baseURL)
                .post(url)
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 400 BAD REQUEST on empty body 2", () => {
            return request(baseURL)
                .post(url)
                .send({})
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 400 BAD REQUEST on missing username", async () => {
            return request(baseURL)
                .post(url)
                .send({password: "password"})
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 400 BAD REQUEST on missing password", () => {
            return request(baseURL)
                .post(url)
                .send({username: "username"})
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        });

        it("should return 400 BAD REQUEST on 'wrong' username and password", () => {
            return request(baseURL)
                .post(url)
                .send({username: user.username + "nope", password: user.password + "nope"})
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "unauthorized"});
                })
        })

        it("should return 400 BAD REQUEST on already registered user", () => {
            return request(baseURL)
                .post(url)
                .send(user)
                .then(response => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({error: "already registered"});
                })
        })

        it("should return 200 OK on 'good' username and password", () => {
            return request(baseURL)
                .post(url)
                .send({username: user.username, password: user.password})
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({token: expect.any(String), authenticated: true});
                })
        })
    });
});


module.exports = {}