import cors from "cors";
import express from "express";
import type { AppEnvironment } from "./config/env";
import { errorHandler } from "./http/error";
import { sendSuccess } from "./http/response";

export function createApp(environment: AppEnvironment) {
  const app = express();
  app.use(cors({ origin: environment.CLIENT_URL }));
  app.use(express.json());
  app.get("/api/health", (_request, response) => sendSuccess(response, { status: "ok", service: "certificate-blockchain-api" }));
  app.use(errorHandler);
  return app;
}
