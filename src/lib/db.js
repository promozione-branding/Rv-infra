import mongoose from "mongoose"

const uri = process.env.MONGODB_URI

// Cache the connection across hot reloads (dev) and warm invocations (prod)
let cached = globalThis._mongoose
if (!cached) cached = globalThis._mongoose = { conn: null, promise: null }

export default async function db() {
  if (!uri) throw new Error("MONGODB_URI is not set")
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).catch((e) => {
      cached.promise = null
      throw e
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
