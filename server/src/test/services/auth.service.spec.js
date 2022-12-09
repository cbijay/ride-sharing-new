const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const authService = require("../../services/auth.service");

const authRepo = require("../../repository/auth.repository");
const { expect } = require("chai");
const google = require("../../utils/google");

describe("Auth Service", () => {
  let userStubValue, credential, accessToken, payloadStubValue;

  beforeEach(() => {
    userStubValue = {
      _id: faker.database.mongodbObjectId(),
      name: faker.name.fullName(),
      profilePic: faker.image.avatar(),
      role: "user",
    };
    credential = faker.datatype.string();
    accessToken = faker.datatype.string();
    payloadStubValue = {
      email: faker.internet.email(),
      email_verified: true,
      name: faker.name.fullName(),
      picture: faker.image.avatar(),
      given_name: faker.name.firstName(),
      family_name: faker.name.lastName(),
    };
  });

  describe("login", function () {
    it("should login user that matches google credential", async function () {
      const mockedPayload = sinon.mock(google);
      mockedPayload
        .expects("verifyGoogleToken")
        .once()
        .callsFake(() => Promise.resolve(payloadStubValue));

      const mockedRepo = sinon.mock(authRepo);
      mockedRepo
        .expects("findUser")
        .once()
        .callsFake(() => Promise.resolve(userStubValue));

      const mockedToken = sinon.mock(google);
      mockedToken
        .expects("generateToken")
        .once()
        .callsFake(() => Promise.resolve(accessToken));

      const data = await authService.login(credential);

      expect(data).to.not.null;
      expect(data).to.be.an("object");
      expect(data).to.have.property("type");

      expect(data).to.have.property("statusCode");
      expect(data).to.have.property("message");
      expect(data).to.have.property("accessToken");

      mockedPayload.verify();
      mockedPayload.restore();

      mockedRepo.verify();
      mockedRepo.restore();

      mockedToken.verify();
      mockedToken.restore();
    });

    it("should unable to login if credential is not provided", async function () {
      const data = await authService.login();

      expect(data).to.be.an("object");
      expect(data.type).to.equal("Error");

      expect(data.message).to.equal("Invalid Credential");
      expect(data.statusCode).to.equal(500);
    });

    it("should be unable to login user that doesn't exist", async function () {
      const mockedPayload = sinon.mock(google);
      mockedPayload
        .expects("verifyGoogleToken")
        .once()
        .callsFake(() => Promise.resolve(payloadStubValue));

      const mockedRepo = sinon.mock(authRepo);
      mockedRepo
        .expects("findUser")
        .once()
        .callsFake(() => Promise.resolve(null));

      const data = await authService.login(credential);

      expect(data.statusCode).to.equal(500);
      expect(data.message).to.equal("User doesn't exist");

      mockedPayload.verify();
      mockedPayload.restore();

      mockedRepo.verify();
      mockedRepo.restore();
    });
  });

  describe("signup", function () {
    let latitude, longitude;

    beforeEach(() => {
      latitude = faker.address.latitude();
      longitude = faker.address.longitude();
    });

    it("should create new user that matches google credential and doesn't exist", async function () {
      const mockedPayload = sinon.mock(google);
      mockedPayload
        .expects("verifyGoogleToken")
        .once()
        .callsFake(() => Promise.resolve(payloadStubValue));

      const mockedFindUser = sinon.mock(authRepo);
      mockedFindUser
        .expects("findUser")
        .once()
        .callsFake(() => Promise.resolve(null));

      const mockedRepo = sinon.mock(authRepo);
      mockedRepo
        .expects("createUser")
        .once()
        .callsFake(() => Promise.resolve(userStubValue));

      const accessToken = faker.datatype.string();

      const mockedToken = sinon.mock(google);
      mockedToken
        .expects("generateToken")
        .once()
        .callsFake(() => Promise.resolve(accessToken));

      const data = await authService.signup(credential, latitude, longitude);

      expect(data).to.not.null;
      expect(data).to.be.an("object");
      expect(data).to.have.property("type");

      expect(data).to.have.property("statusCode");
      expect(data).to.have.property("message");
      expect(data).to.have.property("accessToken");

      mockedPayload.verify();
      mockedPayload.restore();

      mockedFindUser.verify();
      mockedFindUser.restore();

      mockedRepo.verify();
      mockedRepo.restore();

      mockedToken.verify();
      mockedToken.restore();
    });

    it("should be unable to signup if credential is not provided", async function () {
      const data = await authService.signup();

      expect(data).to.be.an("object");
      expect(data.type).to.equal("Error");

      expect(data.message).to.equal("Invalid Credential");
      expect(data.statusCode).to.equal(500);
    });

    it("should not signup user when email already exists", async () => {
      const mockedPayload = sinon.mock(google);
      mockedPayload
        .expects("verifyGoogleToken")
        .once()
        .callsFake(() => Promise.resolve(payloadStubValue));

      const mockedFindUser = sinon.mock(authRepo);
      mockedFindUser
        .expects("findUser")
        .once()
        .callsFake(() => Promise.resolve(payloadStubValue));

      const data = await authService.signup(credential, latitude, longitude);

      expect(data.statusCode).to.equal(500);
      expect(data.message).to.equal("You have already signedup!!");
    });
  });
});
