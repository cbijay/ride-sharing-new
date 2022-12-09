const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const sinon = require("sinon");

const dashboardController = require("../../controller/dashboard.controller");
const dashboardService = require("../../services/dashboard.service");
const response = require("../../utils/response");

describe("Dashboard controller", () => {
  describe("userDashboard", () => {
    let res, json, status;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = {
        json,
        status,
      };
      status.returns(res);
    });

    it("should return dashboard stats", async function () {
      const req = {
        user: { role: "user", userId: faker.database.mongodbObjectId() },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Stats fetched successfully!!",
        pendingCount: 1,
        completedCount: 0,
        cancelledCount: 0,
      };

      const mockedService = sinon.mock(dashboardService);
      mockedService
        .expects("dashboardStats")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await dashboardController.userDashboard(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("pendingCount");
      expect(data).to.have.property("completedCount");

      expect(data).to.have.property("cancelledCount");
      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });
});
