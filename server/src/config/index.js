require("dotenv").config();

exports.config = {
  app: {
    port: process.env.APP_PORT,
    nodeEnv: process.env.APP_ENV,
  },
  db: {
    uri: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  },
  mail: {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    email: process.env.MAIL_EMAIL,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  google: {
    client: process.env.GOOGLE_CLIENT_ID,
  },
  rider: {
    maxDistance: process.env.MAX_DISTANCE,
  },
  bcrypt: {
    salt: process.env.BCRYPT_SALT,
  },
};
