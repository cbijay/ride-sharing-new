const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../models/user.model");

const authRepo = require("../../repository/auth.repository");
const { faker } = require("@faker-js/faker");

describe("Auth Repository", () => {
  describe("findUser", () => {
    after(() => {
      User.findOne.restore();
    });

    it("should find user that matches for provided email", async () => {
      const stubValue = {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profilePic: faker.image.avatar(),
        role: "user",
      };

      const stub = sinon.stub(User, "findOne").returns(stubValue);
      const user = await authRepo.findUser(stubValue.email);

      expect(stub.calledOnce).to.be.true;
      expect(user).not.null;

      expect(user).to.have.property("_id");
      expect(user).to.have.property("name");
      expect(user).to.have.property("profilePic");
      expect(user).to.have.property("role");
    });
  });

  describe("createUser", () => {
    it("should create new user if user doesn't exist", async () => {
      const stubValue = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profilePic: faker.image.avatar(),
        location: {
          coordinates: [faker.address.latitude, faker.address.longitude],
        },
      };
      const stub = sinon.stub(User, "create").returns(stubValue);
      const user = await authRepo.createUser(stubValue, 27, 85);

      expect(stub.calledOnce).to.be.true;
      expect(user).not.null;
      expect(user).to.be.an("object");

      expect(user).to.have.property("name");
      expect(user).to.have.property("email");
      expect(user).to.have.property("profilePic");
      expect(user).to.have.property("location");
    });
  });
});
