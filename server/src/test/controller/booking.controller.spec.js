const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const sinon = require("sinon");

const bookingController = require("../../controller/booking.controller");
const bookingService = require("../../services/booking.service");

const jwt = require("jsonwebtoken");
const { config } = require("../../config");
const response = require("../../utils/response");

describe("Booking controller", () => {
  let bookingStubValue, status, res, json, riderId;

  beforeEach(() => {
    bookingStubValue = {
      requestTime: faker.datatype.datetime(),
      startLocation: {
        coordinates: [faker.address.latitude(), faker.address.longitude()],
        address: faker.address.streetAddress(),
      },
      endLocation: {
        coordinates: [faker.address.latitude(), faker.address.longitude()],
        address: faker.address.streetAddress(),
      },
      totalDistance: faker.datatype.number(),
      estimatedTime: faker.datatype.number(),
    };
    status = sinon.stub();
    json = sinon.spy();
    res = {
      json,
      status,
    };
    status.returns(res);
    riderId = faker.database.mongodbObjectId();
  });

  describe("bookRide", () => {
    it("should book ride", async function () {
      const req = {
        body: bookingStubValue,
        user: {
          name: faker.name.fullName(),
          userId: faker.database.mongodbObjectId(),
        },
        params: { riderId },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Booked successfully!!",
        booking: bookingStubValue,
      };

      const mockedService = sinon.mock(bookingService);
      mockedService
        .expects("createBooking")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await bookingController.bookRide(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("booking");

      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });

  describe("rideRequest", () => {
    let token;

    before(() => {
      token = jwt.sign(
        {
          riderId: riderId,
          email: faker.internet.email(),
        },
        config.jwt.secret,
        { expiresIn: "15m" }
      );
    });

    it("should return booking that matches ride request", async function () {
      const req = {
        query: { token },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Successfully verified!!",
        booking: bookingStubValue,
      };

      const mockedService = sinon.mock(bookingService);
      mockedService
        .expects("verifyRequest")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await bookingController.rideRequest(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("booking");

      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });

  describe("bookingDetail", () => {
    let bookingId;

    before(() => {
      bookingId = faker.database.mongodbObjectId();
    });

    it("should return booking that matches booking id", async function () {
      const req = {
        params: { bookingId },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Booking fetched successfully!!",
        booking: bookingStubValue,
      };

      const mockedService = sinon.mock(bookingService);
      mockedService
        .expects("getBookingDetail")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await bookingController.bookingDetail(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("booking");

      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });

  describe("updateBookingStatus", () => {
    let bookingId, userId;

    before(() => {
      userId = faker.database.mongodbObjectId();
      bookingId = faker.database.mongodbObjectId();
    });

    it("should return booking that matches booking id", async function () {
      const req = {
        params: { bookingId, status: faker.datatype.string() },
        user: { userId, role: "user" },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Booking updated successfully!!",
        booking: bookingStubValue,
      };

      const mockedService = sinon.mock(bookingService);
      mockedService
        .expects("updateStatus")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await bookingController.updateBookingStatus(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("booking");

      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });

  describe("bookingHistory", () => {
    let userId, page, limit;

    before(() => {
      userId = faker.database.mongodbObjectId();
      page = 1;
      limit = 1;
    });

    it("should return booking that matches booking id", async function () {
      const req = {
        user: { role: "user", userId },
        query: { page, limit },
      };

      const stubValue = {
        type: "Success",
        statusCode: 200,
        message: "Booking fetched successfully!!",
        bookings: [bookingStubValue],
      };

      const mockedService = sinon.mock(bookingService);
      mockedService
        .expects("history")
        .once()
        .callsFake(() => Promise.resolve([stubValue]));

      const mockedResponse = sinon.mock(response);
      mockedResponse
        .expects("successResponse")
        .once()
        .callsFake(() => Promise.resolve(stubValue));

      const data = await bookingController.bookingHistory(req, res);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("bookings");

      expect(data.type).to.equal("Success");
      expect(data.statusCode).to.equal(200);

      mockedService.verify();
      mockedService.restore();

      mockedResponse.verify();
      mockedResponse.restore();
    });
  });
});
