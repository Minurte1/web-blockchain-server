import type { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess } from "../../http/response";
import { InstitutionService } from "./institution.service";
const schema = z.object({ name: z.string().trim().min(1), code: z.string().trim().min(1), address: z.string().trim().optional(), blockchainIssuerAddress: z.string().trim().optional() });
export class InstitutionController { constructor(private readonly service = new InstitutionService()) {} list = async (_request: Request, response: Response) => sendSuccess(response, await this.service.list()); create = async (request: Request, response: Response) => sendSuccess(response, await this.service.create(schema.parse(request.body)), 201); }
