import { InstitutionModel } from "./institution.model";
export class InstitutionRepository { create(input: Record<string, unknown>) { return InstitutionModel.create(input); } findById(id: string) { return InstitutionModel.findById(id).exec(); } findByCode(code: string) { return InstitutionModel.findOne({ code }).exec(); } list() { return InstitutionModel.find().sort({ name: 1 }).exec(); } }
