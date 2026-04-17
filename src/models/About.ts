import { Schema, model, models } from "mongoose";

const aboutSchema = new Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    description: { type: String, required: true },
    vision: { type: String, required: true },
    mission: { type: String, required: true },
    philosophy: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const About = models.About || model("About", aboutSchema);
export default About;
