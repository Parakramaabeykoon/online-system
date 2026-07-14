import dns from "node:dns";
dns.setServers(["1.1.1.1"]);
import express from "express";
import mongoose from "mongoose";
import { setupPrimary } from "node:cluster";
import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();



const app = express()
app.use(cors())

app.use(express.json());

app.use(
  (req, res, next) => {
    let token = req.header("Authorization")

    if (token != null) {
      token = token.replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
          if (decoded == null) {
            res.json({
              message: "Invalid token please login again"
            })
            return
          } else {
            req.user = decoded
          }
        }

      )
    }
    next()
  })


const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(
  () => {
    console.log("Database Connected")
  }
).catch((err) => {
  console.log("Database Connection Failed")

})
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.listen(5000,
  () => {
    console.log("Server is running on port 5000")
  })