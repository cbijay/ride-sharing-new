const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../models/user.model");

const riderRepo = require("../../repository/rider.repository");
const { faker } = require("@faker-js/faker");

describe("Rider Repository", () => {
  let stubValue;
  before(() => {
    stubValue = [
      {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        profilePic: faker.image.avatar(),
        role: "rider",
        vehicle: {
          color: faker.vehicle.color(),
          model: faker.vehicle.vehicle(),
          number: faker.vehicle.vrm(),
        },
      },
    ];
  });

  describe("getRidersByLocation", () => {
    it("should get riders based on user nearest location", async () => {
      const stub = sinon.stub(User, "aggregate").returns(stubValue);

      const riders = await riderRepo.getRidersByLocation(27, 85);
      expect(stub.calledOnce).to.be.true;
      expect(riders).not.null;
      expect(riders[0]).to.have.property("_id");
      expect(riders[0]).to.have.property("name");
      expect(riders[0]).to.have.property("profilePic");
      expect(riders[0]).to.have.property("role");
      expect(riders[0]).to.have.property("vehicle");
    });
  });
});
