const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const dashboardRepo = require("../../repository/dashboard.repository");

const dashboardService = require("../../services/dashboard.service");
const { expect } = require("chai");

describe("Dashboard Service", () => {
  describe("dashboardStats", function () {
    it("should return dashboard stat that matches role and userId", async function () {
      const stubValue = [{ count: 1 }];

      const mockedRepo = sinon.mock(dashboardRepo);
      mockedRepo
        .expects("userBookingStat")
        .thrice()
        .callsFake(() => Promise.resolve(stubValue));

      const userId = faker.database.mongodbObjectId();

      const stat = await dashboardService.dashboardStats("user", userId);
      expect(stat).to.not.null;
      expect(stat).to.be.an("object");

      expect(stat).to.have.property("type");
      expect(stat).to.have.property("statusCode");
      expect(stat).to.have.property("message");
      expect(stat).to.have.property("pendingCount");
      expect(stat).to.have.property("cancelledCount");
      expect(stat).to.have.property("completedCount");

      mockedRepo.verify();
      mockedRepo.restore();
    });
  });
});
