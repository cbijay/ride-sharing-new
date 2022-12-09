const { generateRiderSeeder } = require("./rider.seed");

const seedDB = async () => {
  generateRiderSeeder();
};

seedDB();
