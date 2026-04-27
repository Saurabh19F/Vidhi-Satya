import { Schema, model, models } from "mongoose";

const siteSettingSchema = new Schema(
  {
    siteName: { type: String, required: true, default: "Vidhi Satya" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
    primaryColor: { type: String, default: "#0F172A" },
    secondaryColor: { type: String, default: "#1D4ED8" },
    footerText: { type: String, default: "Advisory with clarity and accountability." },
    ctaText: { type: String, default: "Book Your Strategic Consultation" }
  },
  { timestamps: true }
);

const SiteSetting = models.SiteSetting || model("SiteSetting", siteSettingSchema);
export default SiteSetting;
