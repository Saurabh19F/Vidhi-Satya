import { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true }
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;
