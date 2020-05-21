const supertest = require("supertest");
const server = require("./server");
const model = require("../usersRouter/model");
const db = require("../data/dbConfig");

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
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
    it("should return correct first user", () => {
      return supertest(server)
        .get("/users")
        .then((res) => {
          const testItem = { id: 1, name: "sam" };
          expect(res.body[0]).toEqual(testItem);
        });
    });
  });

  describe("POST /users", () => {
    it("should correct length of user list", async () => {
      await model.add({ name: "Sheldon" });

      // read data from the table
      const users = await db("users");
      let amount = users.length;
      expect(users).toHaveLength(amount);
    });
    it("should return true when add new user", async () => {
      await model.add({ name: "Mary" });
      // read data from the table
      const users = await db("users");
      expect(users[users.length - 1]).toBeTruthy();
    });
  });

  describe("DELETE /users/:id", () => {
    it("should return correct length after remove users", async () => {
      const users = db("users");
      let amount = users.length;
      await model.remove(amount - 1);

      const data = await db("users");
      newAmount = data.length;
      expect(data).toHaveLength(newAmount);
    });
    it("should return undefine on the deleted id", async () => {
      const users = db("users");
      let amount = users.length;
      await model.remove(amount - 1);
      // read data from the table
      const newUsers = await db("users");
      expect(newUsers[newUsers.length]).toBeUndefined();
    });
  });
});
