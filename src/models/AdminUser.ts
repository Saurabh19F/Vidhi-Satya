import { Schema, model, models, type InferSchemaType, type HydratedDocument } from "mongoose";

const adminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export type AdminUserType = InferSchemaType<typeof adminUserSchema>;
export type AdminUserDocument = HydratedDocument<AdminUserType>;

const AdminUser = models.AdminUser || model("AdminUser", adminUserSchema);

export default AdminUser;
