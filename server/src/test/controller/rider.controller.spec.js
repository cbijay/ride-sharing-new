const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const Sinon = require("sinon");

const { searchRider } = require("../../controller/rider.controller");
const riderService = require("../../services/rider.service");

// describe("Rider controller", () => {
//   describe("searchRider", () => {
//     let res;

//     beforeEach(() => {
//       res = {
//         json: Sinon.spy(),
//         status: Sinon.stub().returns({ json: Sinon.spy() }), // to spy res.status(500).end()
//       };
//     });

//     it("should search riders that matches provided lat and long", async () => {
//       const req = {
//         query: { lat: faker.address.latitude, long: faker.address.longitude },
//       };
//       const stubValue = [
//         {
//           _id: faker.database.mongodbObjectId(),
//           name: faker.name.fullName(),
//           profilePic: faker.image.avatar(),
//           role: "rider",
//           vehicle: {
//             color: faker.vehicle.color(),
//             model: faker.vehicle.vehicle(),
//             number: faker.vehicle.vrm(),
//           },
//         },
//       ];

//       const stub = Sinon.stub(riderService, "getRiders").returns(stubValue);

//       const riders = await searchRider(req, res);
//       //   expect(stub.calledOnce).to.be.true;
//       //   done();
//       //   done();
//       //   expect(status.calledOnce).to.be.true;
//       expect(res.statusCode).to.equal(200);
//       //   expect(riders).to.be.an("object");
//       //   expect(riders).to.have.property("riders");
//     });
//   });
// });
