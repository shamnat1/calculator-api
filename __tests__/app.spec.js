const request = require("supertest");
const app = require("../app");

describe("/ calculator Get request",()=>{
     beforeAll((done) => {
          server = app.listen(4002, () => console.log('Listening on port 4002'));
          done()
      });
  
      afterAll(async () => {
          await server.close();
      });

     it("it should return caluculated value",async()=>{
          const response = await request(app).get("/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk");
          expect(response.body).toEqual({"error":false,"result":-132.88888888888889});
     })

     it("it should return error if no equation found",async()=>{
          const response = await request(app).get("/calculus?query=");
          expect(response.body).toEqual({ error: true, message: "No string found" });
     })

     it("it should return error if the decode value is incorrect",async()=>{
          const response = await request(app).get("/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqM");
          console.log("response",response.body)
          expect(response.body).toEqual({"error":true,"message":"Incorrect equation"});
     })
})