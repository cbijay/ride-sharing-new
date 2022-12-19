const { expect } = require("chai");
const sinon = require("sinon");
const bookingRepo = require("../../repository/booking.repository");

const { faker } = require("@faker-js/faker");
const { Booking } = require("../../models/booking.model");
const { User } = require("../../models/user.model");

describe("Booking Repository", () => {
  let stubValue, userId, riderId, findBookingStub, bookingId;

  beforeEach(() => {
    stubValue = {
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
      status: faker.datatype.string(),
    };
    userId = faker.database.mongodbObjectId();
    riderId = faker.database.mongodbObjectId();
    bookingId = faker.database.mongodbObjectId();
  });

  describe("bookRide", () => {
    it("should book ride", async () => {
      const stub = sinon.stub(Booking, "create").returns(stubValue);

      const booking = await bookingRepo.bookRide(stubValue, userId, riderId);

      expect(stub.calledOnce).to.be.true;
      expect(booking).not.null;
      expect(booking).to.be.an("object");
      expect(booking).to.have.property("requestTime");
      expect(booking).to.have.property("startLocation");
      expect(booking).to.have.property("endLocation");
      expect(booking).to.have.property("totalDistance");
      expect(booking).to.have.property("estimatedTime");
    });
  });

  describe("findBooking", () => {
    after(() => {
      Booking.aggregate.restore();
    });

    it("should find booking that matches userId or riderId and role", async () => {
      const findBookingStub = sinon
        .stub(Booking, "aggregate")
        .returns(stubValue);
      const booking = await bookingRepo.findBooking(userId, "user");

      expect(findBookingStub.calledOnce).to.be.true;
      expect(booking).not.null;
      expect(booking).to.be.an("object");

      expect(booking).to.have.property("requestTime");
      expect(booking).to.have.property("startLocation");
      expect(booking).to.have.property("endLocation");

      expect(booking).to.have.property("totalDistance");
      expect(booking).to.have.property("estimatedTime");
      expect(booking).to.have.property("status");
    });
  });

  describe("updateBooking", () => {
    let updatedStubValue;

    before(() => {
      updatedStubValue = {
        matchedCount: faker.datatype.number(),
        modifiedCount: faker.datatype.number(),
        acknowledged: faker.datatype.boolean(),
      };
    });

    it("should update booking that matches given booking id and query", async () => {
      const updateBookingStub = sinon
        .stub(Booking, "updateOne")
        .returns(updatedStubValue);

      const booking = await bookingRepo.updateBooking(bookingId, {
        status: 1,
      });

      expect(updateBookingStub.calledOnce).to.be.true;
      expect(booking).not.null;
      expect(booking).to.be.an("object");
      expect(booking.matchedCount).to.equal(updatedStubValue.matchedCount);
      expect(booking.modifiedCount).to.equal(updatedStubValue.modifiedCount);
      expect(booking.acknowledged).to.equal(updatedStubValue.acknowledged);
    });
  });

  describe("userBookingHistory", () => {
    let userId;

    before(() => {
      userId = faker.database.mongodbObjectId();
    });

    after(() => {
      Booking.aggregate.restore();
    });

    it("should return all booking history", async () => {
      const bookingStub = sinon.stub(Booking, "aggregate").returns([stubValue]);

      const bookings = await bookingRepo.userBookingHistory(
        0,
        10,
        "user",
        userId
      );

      expect(bookingStub.calledOnce).to.be.true;
      expect(bookings).not.null;
      expect(bookings).to.be.an("array");
    });
  });

  describe("bookingById", () => {
    let userId;

    before(() => {
      userId = faker.database.mongodbObjectId();
      userStubValue = {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        profilePic: faker.image.avatar(),
        role: "user",
      };
    });

    after(() => {
      Booking.aggregate.restore();
    });

    it("should return booking", async () => {
      const bookingStub = sinon.stub(Booking, "aggregate").returns(stubValue);

      const booking = await bookingRepo.bookingById(bookingId);

      expect(bookingStub.calledOnce).to.be.true;
      expect(booking).not.null;
      expect(booking).to.be.an("object");

      expect(booking).to.have.property("requestTime");
      expect(booking).to.have.property("startLocation");
      expect(booking).to.have.property("endLocation");

      expect(booking).to.have.property("totalDistance");
      expect(booking).to.have.property("estimatedTime");
      expect(booking).to.have.property("status");
    });
  });
});
