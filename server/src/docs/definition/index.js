const { swaggerPaths } = require("./path");
const { config } = require("../../config");

exports.swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ride Sharing API with Swagger",
    version: "1.0.0",
    description:
      "ride share api for ride sharing web application made with Express and documented with Swagger",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  basePath: "/api",
  servers: [
    {
      url: `http://localhost:${config.app.port}/api`,
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Auth routes",
    },
    {
      name: "Dashboard",
      description: "Dashboard routes",
    },
    {
      name: "Booking",
      description: "Booking routes",
    },
    {
      name: "Rider",
      description: "Rider routes",
    },
  ],
  components: {
    securitySchemes: {
      Auth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "authorization",
      },
    },
  },
  paths: swaggerPaths,
};
