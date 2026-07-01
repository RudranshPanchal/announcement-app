import mongoose from "mongoose";

let connected = false;

export async function connectDB() {
    if (connected) return;

    await mongoose.connect(process.env.MONGODB_URI!);

    connected = true;

    console.log("🍃🍃🍃🍃🍃🍃🍃🍃🍃MongoDB Connected")
}