import type { Request, Response } from "express";
import { sendSuccess } from "../../http/response";
import { VerificationService } from "./verification.service";
export class VerificationController { constructor(private readonly service: VerificationService) {} verify = async (request: Request, response: Response) => sendSuccess(response, await this.service.verify(Array.isArray(request.params.certificateCode) ? request.params.certificateCode[0] : request.params.certificateCode, request.ip, request.header("user-agent") ?? undefined)); }
