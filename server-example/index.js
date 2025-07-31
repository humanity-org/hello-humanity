import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Humanity Protocol Server Example",
      version: "1.0.0",
      description:
        "A server example demonstrating integration with Humanity Protocol API",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     VerificationResponse:
 *       type: object
 *       properties:
 *         wallet_address:
 *           type: string
 *           description: The wallet address that was verified
 *           example: "0xdead00000000000000000000000000000000beef"
 *         is_human:
 *           type: boolean
 *           description: Whether the wallet is verified as human
 *           example: true
 *         user_id:
 *           type: string
 *           description: The user ID if verified
 *           example: "user_123456"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the verification
 *         server:
 *           type: string
 *           description: Server identifier
 *           example: "humanity-protocol-server-example"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *         message:
 *           type: string
 *           description: Detailed error message
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "ok"
 *         timestamp:
 *           type: string
 *           format: date-time
 *         apiUrl:
 *           type: string
 *           example: "https://api.humanity.org"
 */

/**
 * @swagger
 * /verify/{walletAddress}:
 *   get:
 *     summary: Verify if a wallet address belongs to a human
 *     description: Checks whether the supplied wallet address is associated with a palm-verified Humanity Protocol user
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         description: The wallet address to verify (EIP-55 compliant)
 *         schema:
 *           type: string
 *           example: "0xdead00000000000000000000000000000000beef"
 *     responses:
 *       200:
 *         description: Successful verification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get("/verify/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;

  console.log(
    `[${new Date().toISOString()}] Verifying wallet: ${walletAddress}`,
  );

  if (!process.env.HP_API_URL) {
    console.error("HP_API_URL is not set in environment variables");
    return res.status(500).json({
      error: "Server configuration error",
      message: "API URL not configured. Please check your .env file.",
    });
  }

  if (!process.env.HP_API_KEY) {
    console.error("HP_API_KEY is not set in environment variables");
    return res.status(500).json({
      error: "Server configuration error",
      message: "API key not configured. Please check your .env file.",
    });
  }

  try {
    const apiUrl = `${process.env.HP_API_URL}/v1/human/verify?wallet_address=${walletAddress}`;
    console.log(`[${new Date().toISOString()}] Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        "X-HP-API-Key": process.env.HP_API_KEY,
      },
    });

    const data = await response.json();

    console.log(`[${new Date().toISOString()}] Response:`, data);

    if (!response.ok) {
      return res.status(response.status).json({
        ...data,
        timestamp: new Date().toISOString(),
        server: "humanity-protocol-server-example",
      });
    }

    res.json({
      ...data,
      timestamp: new Date().toISOString(),
      server: "humanity-protocol-server-example",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error);
    res.status(500).json({
      error: "Failed to verify wallet",
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server health
 *     description: Returns the current server status and configuration
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    apiUrl: process.env.HP_API_URL,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  console.log(`Using Humanity Protocol API at: ${process.env.HP_API_URL}`);
});
