import { InferSchemaType, Schema, model } from "mongoose";
const studentSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User" }, studentCode: { type: String, required: true, unique: true, trim: true }, fullName: { type: String, required: true, trim: true }, dateOfBirth: Date, major: { type: String, required: true, trim: true }, className: { type: String, trim: true }, course: { type: String, trim: true } }, { timestamps: true });
export type Student = InferSchemaType<typeof studentSchema>;
export const StudentModel = model("Student", studentSchema);
