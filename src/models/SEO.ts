import { Schema, model, models } from "mongoose";

const seoSchema = new Schema(
  {
    page: { type: String, required: true, unique: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

const SEO = models.SEO || model("SEO", seoSchema);
export default SEO;
