import { Schema, model, models } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const FAQ = models.FAQ || model("FAQ", faqSchema);
export default FAQ;
