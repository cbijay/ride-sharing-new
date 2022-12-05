const Sinon = require("sinon");
const { faker } = require("@faker-js/faker");

const riderRepo = require("../../repository/rider.repository");
const { expect, assert } = require("chai");
const riderService = require("../../services/rider.service");

describe("Rider Service", () => {
  describe("getRiders", () => {
    let stubValue, repositoryStub;

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

    beforeEach(() => {
      repositoryStub = Sinon.stub(riderRepo, "getRidersByLocation");
    });

    afterEach(() => {
      repositoryStub.restore();
    });

    it("should get all riders that matches the provided lat and long", async () => {
      repositoryStub.returns(Promise.resolve(stubValue));

      // const spy = Sinon.spy(riderRepo, "getRidersByLocation").returnValues(
      //   stubValue
      // );

      const riders = await riderService.getRiders(25, 85);

      // stub.restore();
      // Sinon.assert.callCount(spy, 1);
      // assert.equal(repositoryStub.calledOnce, true);
      // Sinon.assert.calledOnce(stub);
      // expect(stub.calledOnce).to.be.true;
      expect(riders).to.not.null;
      expect(riders).to.be.an("object");
      expect(riders).to.have.property("riders");
    });
  });
});
