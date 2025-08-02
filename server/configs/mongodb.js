// import mongoose from "mongoose";

// const connectDB = async () => {

//       mongoose.connection.on('connected',()=>{
//         console.log("Database Connected");
//       })

//     // await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)
//         await mongoose.connect(process.env.MONGODB_URI);

// }
// export default connectDB

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
