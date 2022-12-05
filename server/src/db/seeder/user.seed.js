const { User } = require("../../models/user.model");
const { faker } = require("@faker-js/faker");

const fs = require("fs");

exports.generateUserSeeder = () => {
  try {
    const total = 10;
    const users = [];
    const role = ["rider", "user"];
    const userRole = role[~~(Math.random() * role.length)];

    for (let i = 0; i < total; i++) {
      users.push(
        new User({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          profile_pic: faker.image.avatar(),
          role: userRole,
          location: {
            coordinates: [
              faker.address.latitude(90, 0, 5),
              faker.address.longitude(90, 0, 5),
            ],
          },
        })
      );
    }

    fs.appendFile(
      "src/data/users.json",
      JSON.stringify(users),
      { flag: "wx" },
      (err) => {
        if (err) console.log(err);

        console.info("User data file generated successfully");
      }
    );
  } catch (error) {
    console.error(error);
  }
};
