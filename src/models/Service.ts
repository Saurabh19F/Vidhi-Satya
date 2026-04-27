import { Schema, model, models } from "mongoose";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, default: "briefcase" },
    imageUrl: { type: String, required: true },
    benefits: [{ type: String }],
    process: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true }
  },
  { timestamps: true }
);

const Service = models.Service || model("Service", serviceSchema);
export default Service;
