import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [
  {
    bearerAuth: [],
  },
],
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
        description: "A simple Express Task Management API",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;