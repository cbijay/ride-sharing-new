import { faker } from "@faker-js/faker";
import Logger from "../../../core/logs/logger";
import { User } from "../../models/user.model";

export const seedUser = () => {
  try {
    const total = 5;
    const users = [];
    const role = ["user", "rider"];
    const random = Math.random();

    for (let i = 0; i < total; i++) {
      users.push(
        new User({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          profile_pic: faker.image.avatar(),
          role: role[random],
          location: {
            coordinates: [
              faker.address.latitude(90, 0, 5),
              faker.address.longitude(90, 0, 5),
            ],
          },
        })
      );
    }

    users.map((user) => {
      console.log(user);
      Logger.info("User data seeeded successfully");
    });
  } catch (error) {
    Logger.error(error);
  }
};
