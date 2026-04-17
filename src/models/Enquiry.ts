import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    serviceInterested: { type: String, default: "General Advisory" },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

const Enquiry = models.Enquiry || model("Enquiry", enquirySchema);
export default Enquiry;
