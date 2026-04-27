import { Schema, model, models } from "mongoose";

const visitorStatSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "global" },
    totalVisits: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

const VisitorStat = models.VisitorStat || model("VisitorStat", visitorStatSchema);
export default VisitorStat;
