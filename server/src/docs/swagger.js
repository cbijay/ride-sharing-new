const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerDefinition } = require("./definition");

const options = {
  definition: swaggerDefinition,
  apis: ["../server.js"],
};

exports.swaggerDocument = swaggerJSDoc(options, { explorer: true });
