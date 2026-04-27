import { Schema, model, models } from "mongoose";

const heroSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Hero = models.Hero || model("Hero", heroSchema);
export default Hero;
