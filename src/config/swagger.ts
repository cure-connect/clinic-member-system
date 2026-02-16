import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clinic Member API",
            version: "1.0.0",
            description: "API documentation for Clinic Members Service",
        },
        servers: [
            {
                url: "http://localhost:8888",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Point: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        userId: { type: "string" },
                        point: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                CreatePointRequest: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                        point: { type: "number" },
                    },
                    required: ["userId", "point"],
                },
                Reward: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        pointCost: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    }
                },

                CreateRewardRequest: {
                    type: "object",
                    required: ["name", "pointCost"],
                    properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        pointCost: { type: "number" }
                    }
                },

                UpdateRewardRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        pointCost: { type: "number" }
                    }
                },
                RewardUsed: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        userId: { type: "string" },
                        rewardId: { type: "string" },
                        usedPoint: { type: "number" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },

                CreateRewardUsedRequest: {
                    type: "object",
                    required: ["rewardId"],
                    properties: {
                        rewardId: { type: "string" }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    }
                },

                CreateUserRequest: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" },
                        role: { type: "string" }
                    }
                },

                UpdateUserRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" }
                    }
                },
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "username" },
                        password: { type: "string", example: "123456" }
                    }
                },

                LoginResponse: {
                    type: "object",
                    properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                        user: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
