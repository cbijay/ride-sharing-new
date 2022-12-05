const { faker } = require("@faker-js/faker");
const fs = require("fs");
const { Rider } = require("../../models/rider.mdel");

exports.generateRiderSeeder = () => {
  try {
    const total = 10;
    const riders = [];

    for (let i = 0; i < total; i++) {
      riders.push(
        new Rider({
          userId: faker.database.mongodbObjectId(),
          vehicle: {
            color: faker.vehicle.color(),
            model: faker.vehicle.vehicle(),
            number: faker.vehicle.vrm(),
          },
        })
      );
    }

    fs.appendFile(
      "src/data/riders.json",
      JSON.stringify(riders),
      { flag: "wx" },
      (err) => {
        if (err) console.log(err);

        console.info("rider data file generated successfully");
      }
    );
  } catch (error) {
    console.error(error);
  }
};
