exports.swaggerPaths = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      description: "Register new user",
      parameters: [
        {
          name: "body",
          in: "body",
          schema: {
            type: "object",
            required: {
              credential: true,
              lat: true,
              long: true,
            },
            properties: {
              credential: {
                type: "string",
              },
              lat: {
                type: "number",
              },
              long: {
                type: "number",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Successfully Signup!!",
                  accessToken: "",
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      description: "Login user",
      parameters: [
        {
          name: "body",
          in: "body",
          schema: {
            type: "object",
            required: {
              credential: true,
            },
            properties: {
              credential: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Successfully loggedin!!",
                  accessToken: "",
                },
              },
            },
          },
        },
      },
    },
  },
  "/dashboard/stat": {
    get: {
      tags: ["Dashboard"],
      description: "Dashboard Stat",
      security: [{ Auth: [] }],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Stat fetched successfully!!",
                  pendingCount: 0,
                  completedCount: 0,
                  cancelledCount: 0,
                },
              },
            },
          },
        },
      },
    },
  },
  "/booking/history": {
    get: {
      tags: ["Booking"],
      description: "List all bookings history",
      security: [{ Auth: [] }],
      parameters: [
        {
          name: "page",
          in: "query",
          type: "number",
          required: true,
        },
        {
          name: "perPage",
          in: "query",
          type: "number",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Booking fetched successfully!!",
                  bookings: [
                    {
                      _id: "",
                      requestTime: "",
                      startLocation: {
                        address: "",
                        coordinates: [0, 0],
                      },
                      endLocation: {
                        address: "",
                        coordinates: [0, 0],
                      },
                      status: "",
                      totalDistance: 0,
                      estimatedTime: 0,
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  "/booking/{bookingId}": {
    get: {
      tags: ["Booking"],
      description: "Booking detail",
      security: [{ Auth: [] }],
      parameters: [
        {
          name: "bookingId",
          in: "path",
          type: "string",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Booking fetched successfully!!",
                  booking: {
                    _id: "",
                    requestTime: "",
                    startLocation: {
                      address: "",
                      coordinates: [0, 0],
                    },
                    endLocation: {
                      address: "",
                      coordinates: [0, 0],
                    },
                    status: "",
                    totalDistance: 0,
                    estimatedTime: 0,
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/booking/{riderId}/book": {
    post: {
      tags: ["Booking"],
      description: "Book Ride",
      security: [{ Auth: [] }],
      parameters: [
        {
          name: "riderId",
          in: "path",
          type: "string",
          required: true,
        },
        {
          name: "body",
          in: "body",
          schema: {
            type: "object",
            required: {
              pickupAddress: true,
            },
            properties: {
              pickupCoordinates: {
                type: "array",
                items: {
                  type: "number",
                },
                example: [0, 0],
              },
              pickupAddress: {
                type: "string",
              },
              destinationCoordinates: {
                type: "array",
                items: {
                  type: "number",
                },
                example: [0, 0],
              },
              destinationAddress: {
                type: "string",
              },
              totalDistance: {
                type: "number",
              },
              estimatedTime: {
                type: "number",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Booked successfully!!",
                  booking: {
                    _id: "",
                    requestTime: "",
                    startLocation: {
                      address: "",
                      coordinates: [0, 0],
                    },
                    endLocation: {
                      address: "",
                      coordinates: [0, 0],
                    },
                    status: "",
                    totalDistance: 0,
                    estimatedTime: 0,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/rider/search": {
    get: {
      tags: ["Rider"],
      description: "Search rider",
      security: [{ Auth: [] }],
      parameters: [
        {
          name: "lat",
          in: "query",
          type: "number",
          required: true,
        },
        {
          name: "long",
          in: "query",
          type: "number",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  type: "Success",
                  message: "Riders fetched successfully!!",
                  riders: [
                    {
                      _id: "",
                      name: "",
                      profilePic: "",
                      role: "rider",
                      vehicle: {
                        color: "",
                        model: "",
                        number: "",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};
