import { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String, default: "" },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema);
export default Testimonial;
