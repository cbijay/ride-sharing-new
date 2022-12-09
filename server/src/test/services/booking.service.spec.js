const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const riderRepo = require("../../repository/rider.repository");

const bookingRepo = require("../../repository/booking.repository");
const bookingService = require("../../services/booking.service");
const { expect } = require("chai");

const jwt = require("jsonwebtoken");
const { config } = require("../../config");
const mail = require("../../utils/mail");

describe("Booking Service", () => {
  let bookingStubValue, userId, bookingId;

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
    userId = faker.database.mongodbObjectId();
    bookingId = faker.database.mongodbObjectId();
  });

  describe("createBooking", function () {
    let riderStubValue, riderId, userId, userName;

    before(() => {
      riderStubValue = {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        profilePic: faker.image.avatar(),
        role: "rider",
      };

      riderId = faker.database.mongodbObjectId();
      userName = faker.name.fullName();
    });

    it("should book ride for provided ride detail along with userId, name and riderId", async function () {
      const mockedRiderRepo = sinon.mock(riderRepo);
      mockedRiderRepo
        .expects("findSelectedRider")
        .once()
        .callsFake(() => Promise.resolve([riderStubValue]));

      const mockedMail = sinon.mock(mail);
      mockedMail.expects("sendMail").once();

      const mockedBookingRepo = sinon.mock(bookingRepo);
      mockedBookingRepo
        .expects("bookRide")
        .once()
        .callsFake(() => Promise.resolve(bookingStubValue));

      const booking = await bookingService.createBooking(
        bookingStubValue,
        userId,
        userName,
        riderId
      );

      expect(booking).to.not.null;
      expect(booking).to.be.an("object");

      expect(booking).to.have.property("type");
      expect(booking).to.have.property("statusCode");
      expect(booking).to.have.property("message");
      expect(booking).to.have.property("booking");

      mockedRiderRepo.verify();
      mockedRiderRepo.restore();

      mockedMail.verify();
      mockedMail.restore();

      mockedBookingRepo.verify();
      mockedBookingRepo.restore();
    });

    it("should not create booking when no pickup is provided", async () => {
      const body = {
        requestTime: faker.datatype.datetime(),
        endLocation: {
          coordinates: [faker.address.latitude(), faker.address.longitude()],
          address: faker.address.streetAddress(),
        },
        totalDistance: faker.datatype.number(),
        estimatedTime: faker.datatype.number(),
      };

      const userName = faker.name.fullName();

      const booking = await bookingService.createBooking(
        body,
        userId,
        userName,
        riderId
      );

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Pickup is required");
    });

    it("should not create booking when no destination is provided", async () => {
      const body = {
        requestTime: faker.datatype.datetime(),
        startLocation: {
          coordinates: [faker.address.latitude(), faker.address.longitude()],
          address: faker.address.streetAddress(),
        },
        totalDistance: faker.datatype.number(),
        estimatedTime: faker.datatype.number(),
      };

      const userName = faker.name.fullName();

      const booking = await bookingService.createBooking(
        body,
        userId,
        userName,
        riderId
      );

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Destination is required");
    });

    it("should not create booking when no rider id is provided", async () => {
      const body = {
        requestTime: faker.datatype.datetime(),
        startLocation: {
          coordinates: [faker.address.latitude(), faker.address.longitude()],
          address: faker.address.streetAddress(),
        },
        totalDistance: faker.datatype.number(),
        estimatedTime: faker.datatype.number(),
      };

      const userName = faker.name.fullName();

      const booking = await bookingService.createBooking(
        body,
        userId,
        userName
      );

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Rider id is required");
    });
  });

  describe("verifyRequest", function () {
    let token;

    before(() => {
      token = jwt.sign(
        {
          riderId: faker.database.mongodbObjectId(),
          email: faker.internet.email(),
        },
        config.jwt.secret,
        { expiresIn: "15m" }
      );
    });

    it("should verify request that matches provided token", async function () {
      const mockedRepo = sinon.mock(bookingRepo);
      mockedRepo
        .expects("findBooking")
        .once()
        .callsFake(() => Promise.resolve(bookingStubValue));

      const booking = await bookingService.verifyRequest(token);

      expect(booking).to.not.null;
      expect(booking).to.be.an("object");

      expect(booking).to.have.property("type");
      expect(booking).to.have.property("statusCode");
      expect(booking).to.have.property("message");
      expect(booking).to.have.property("booking");

      mockedRepo.verify();
      mockedRepo.restore();
    });

    it("should not verify request if no token is provided", async () => {
      const booking = await bookingService.verifyRequest();

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Invalid link");
    });
  });

  describe("updateStatus", function () {
    let userStubValue, updatedStubValue;

    before(() => {
      userStubValue = {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        profilePic: faker.image.avatar(),
      };
      updatedStubValue = {
        matchedCount: faker.datatype.number(),
        modifiedCount: faker.datatype.number(),
        acknowledged: faker.datatype.boolean(),
      };
    });

    it("should update booking status that matches booking id, status, userId and role", async function () {
      const mockedMail = sinon.mock(mail);
      mockedMail.expects("sendMail").once();

      const mockedUser = sinon.mock(bookingRepo);
      mockedUser
        .expects("findUser")
        .once()
        .callsFake(() => Promise.resolve(userStubValue));

      const mockedStatus = sinon.mock(bookingRepo);
      mockedStatus
        .expects("updateBooking")
        .once()
        .callsFake(() => Promise.resolve(updatedStubValue));

      const mockedBooking = sinon.mock(bookingRepo);
      mockedBooking
        .expects("findBooking")
        .once()
        .callsFake(() => Promise.resolve(bookingStubValue));

      const booking = await bookingService.updateStatus(
        bookingId,
        2,
        userId,
        "user"
      );

      expect(booking).to.not.null;
      expect(booking).to.be.an("object");

      expect(booking).to.have.property("type");
      expect(booking).to.have.property("statusCode");
      expect(booking).to.have.property("message");
      expect(booking).to.have.property("booking");

      mockedUser.verify();
      mockedUser.restore();

      mockedMail.verify();
      mockedMail.restore();

      mockedStatus.verify();
      mockedStatus.restore();

      mockedBooking.verify();
      mockedBooking.restore();
    });

    it("should not update booking if no booking id is provided", async () => {
      const booking = await bookingService.updateStatus(
        null,
        2,
        userId,
        "user"
      );

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Booking id is required");
    });

    it("should not update booking if no status is provided", async () => {
      const booking = await bookingService.updateStatus(
        bookingId,
        null,
        userId,
        "user"
      );

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Status is required");
    });
  });

  describe("history", function () {
    let page, perPage;

    before(() => {
      page = 1;
      perPage = 10;
    });

    it("should return all booking history that matches for provided role and userId", async function () {
      const mockedRepo = sinon.mock(bookingRepo);
      mockedRepo
        .expects("userBookingHistory")
        .once()
        .callsFake(() => Promise.resolve([bookingStubValue]));

      const data = await bookingService.history(page, perPage, "user", userId);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data.bookings).to.be.an("array");

      mockedRepo.verify();
      mockedRepo.restore();
    });

    it("should not return all booking history when no page and per page are provided", async function () {
      const data = await bookingService.history(null, null, "user", userId);

      expect(data.type).to.equal("Error");
      expect(data.statusCode).to.equal(500);
      expect(data.message).to.equal("Page and perPage query is required");
    });
  });

  describe("getBookingDetail", function () {
    it("should return booking that matches for provided bookingId", async function () {
      const mockedRepo = sinon.mock(bookingRepo);
      mockedRepo
        .expects("bookingById")
        .once()
        .callsFake(() => Promise.resolve([bookingStubValue]));

      const data = await bookingService.getBookingDetail(bookingId);

      expect(data).to.not.null;
      expect(data).to.have.property("type");
      expect(data).to.have.property("statusCode");

      expect(data).to.have.property("message");
      expect(data).to.have.property("booking");
      expect(data.booking).to.be.an("object");

      mockedRepo.verify();
      mockedRepo.restore();
    });

    it("should not return booking if no booking id is provided", async () => {
      const booking = await bookingService.getBookingDetail();

      expect(booking.statusCode).to.equal(500);
      expect(booking.message).to.equal("Booking id is required");
    });
  });
});
