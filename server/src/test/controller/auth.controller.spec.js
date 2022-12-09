const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const sinon = require("sinon");

const authController = require("../../controller/auth.controller");
const authService = require("../../services/auth.service");
const response = require("../../utils/response");

describe("Auth controller", () => {
  let res, json, status, credential, accessToken;

  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = {
      json,
      status,
    };
    status.returns(res);
    credential = faker.datatype.string();
    accessToken = faker.datatype.string();
  });

  describe("userLogin", () => {
    it("should login user", async function () {
      const req = {
        body: { credential },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Successfully loggedin!!",
        accessToken: accessToken,
      };

      const mockedService = sinon.mock(authService);
      mockedService
        .expects("login")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await authController.userLogin(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("accessToken");
      expect(data.type).to.equal("Success");

      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });

  describe("userSignup", () => {
    it("should signup user", async function () {
      const req = {
        body: {
          credential,
          latitude: faker.address.latitude(),
          longitude: faker.address.latitude(),
        },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Successfully Signup!!",
        accessToken: accessToken,
      };

      const mockedService = sinon.mock(authService);
      mockedService
        .expects("signup")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await authController.userSignup(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("accessToken");
      expect(data.type).to.equal("Success");

      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });
});
