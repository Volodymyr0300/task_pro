import "dotenv/config";
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

export function runMongo() {
  mongoose.connect(mongoUri);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database");
  });
}
