import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    company: { type: String, default: "", trim: true, maxlength: 160 },
    phone: { type: String, default: "", trim: true, maxlength: 30 },
    email: { type: String, default: "", trim: true, lowercase: true, maxlength: 200 },
    product: { type: String, default: "", trim: true, maxlength: 200 },
    location: { type: String, default: "", trim: true, maxlength: 200 },
    message: { type: String, default: "", trim: true, maxlength: 3000 },
  },
  { timestamps: true }
)

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema)
