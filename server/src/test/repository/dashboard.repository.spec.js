const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const sinon = require("sinon");

const { Booking } = require("../../models/booking.model");
const dashboardRepo = require("../../repository/dashboard.repository");

describe("Dashboard Repository", () => {
  describe("userBookingStat", () => {
    let repoStub, stubValue;

    before(() => {
      stubValue = [
        {
          count: 1,
        },
      ];
      repoStub = sinon.stub(Booking, "aggregate").returns(stubValue);
    });

    after(() => {
      Booking.aggregate.restore();
    });

    it("should return dashboard stat", async () => {
      const userId = faker.database.mongodbObjectId();

      const stat = await dashboardRepo.userBookingStat(
        "user",
        userId,
        "Accepted"
      );

      expect(repoStub.calledOnce).to.be.true;
      expect(stat).to.be.an("array");
      expect(stat).to.have.length(1);
      expect(stat[0]).to.have.property("count");
    });
  });
});
