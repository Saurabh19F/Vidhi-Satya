import { Schema, model, models } from "mongoose";

const contactInfoSchema = new Schema(
  {
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, default: "" },
    googleMapLink: { type: String, default: "" },
    linkedin: { type: String, default: "https://www.linkedin.com/company/east-delhi-law-office/" },
    twitter: { type: String, default: "" }
  },
  { timestamps: true }
);

const ContactInfo = models.ContactInfo || model("ContactInfo", contactInfoSchema);
export default ContactInfo;
