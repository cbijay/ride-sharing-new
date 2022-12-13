const { faker } = require("@faker-js/faker");
const { calculateLongitude } = require("../../utils/coordinate");
const MongoClient = require("mongodb").MongoClient;

async function seedUser() {
  const client = new MongoClient("mongodb://localhost:27017/", {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const userCollection = client.db("ridesharing").collection("users");
    const riderCollection = client.db("ridesharing").collection("riders");

    // make a bunch of time series data
    let total = 5;
    let users = [];
    let riders = [];
    const defaultLatitude = 27.7076;
    const defaultLongitude = 85.3274;
    const newLongitude = calculateLongitude(defaultLatitude, defaultLongitude);

    for (let i = 1; i <= total; i++) {
      let newUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profile_pic: faker.image.avatar(),
        role: "rider",
        location: {
          type: "Point",
          coordinates: [
            parseFloat(
              faker.address.longitude(newLongitude, defaultLongitude, 4)
            ),
            parseFloat(
              faker.address.latitude(defaultLatitude, defaultLatitude, 4)
            ),
          ],
        },
      };

      users.push(newUser);
    }

    const { insertedCount: userCount, insertedIds: userIds } =
      await userCollection.insertMany(users);

    for (let i = 1; i <= userCount; i++) {
      let newRider = {
        userId: userIds[i],
        vehicle: {
          color: faker.vehicle.color(),
          model: faker.vehicle.vehicle(),
          number: faker.vehicle.vrm(),
        },
      };

      riders.push(newRider);
    }

    const { insertedCount: riderCount } = await riderCollection.insertMany(
      riders
    );

    if ((userCount && riderCount) === total) {
      console.log("Database seeded! :)");
      client.close();
    }

    userCollection.createIndex({ location: "2dsphere" });
  } catch (err) {
    console.log(err.message);
  }
}

seedUser();
