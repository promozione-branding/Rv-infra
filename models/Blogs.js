import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    permalink: { type: String, required: true, unique: true, trim: true },
    date: { type: Date, required: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, required: true },
    imageFileId: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)