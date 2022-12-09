const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const riderService = require("../../services/rider.service");

const riderRepo = require("../../repository/rider.repository");
const { expect } = require("chai");

describe("Rider Service", () => {
  let stubValue;

  describe("getRiders", function () {
    it("should get all riders that matches the provided lat and long", async function () {
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

      const mockedRepo = sinon.mock(riderRepo);
      mockedRepo
        .expects("getRidersByLocation")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const riders = await riderService.getRiders(25, 85);
      expect(riders).to.not.null;
      expect(riders).to.be.an("object");
      expect(riders).to.have.property("riders");

      mockedRepo.verify();
      mockedRepo.restore();
    });

    it("should not return riders when latitude and longitude  is not provided", async () => {
      const riders = await riderService.getRiders();

      expect(riders.statusCode).to.equal(500);
      expect(riders.message).to.equal(
        "Please provide pickup latitude and longitude"
      );
    });
  });
});
