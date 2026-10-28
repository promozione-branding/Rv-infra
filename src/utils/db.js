import mongoose from "mongoose"


export default async function db() {
  mongoose.connect(process.env.MONGODB_URI)
}