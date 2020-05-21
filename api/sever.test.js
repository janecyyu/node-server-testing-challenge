const supertest = require("supertest");
const server = require("./server");

describe("server", () => {
  it("can run", () => {
    expect(true).toBeTruthy();
  });
  describe("GET /", () => {
    it("should return http status 200 ok", () => {
      return (
        supertest(server)
          .get("/")
          //.expect(200) from supertest
          .then((response) => {
            //from jest
            expect(response.status).toBe(200);
            expect(response.status).toBeTruthy();
          })
      );
    });
    it("should return {api:up}", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body).toEqual({ api: "up" });
          expect(res.body.api).toBe("up");
          expect(res.body.api).toBeDefined();
        });
    });
  });
  describe("GET /users", () => {
    it("should return an array", () => {
      return supertest(server)
        .get("/users")
        .then((res) => {
          const testItem = { id: 1, name: "sam" };

          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0]).toEqual(testItem);
        });
    });
  });
});
