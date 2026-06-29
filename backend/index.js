import dns from "node:dns";
dns.setServers(["1.1.1.1"]);
import express from "express";
import mongoose from "mongoose";
import { setupPrimary } from "node:cluster";
import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
import jwt from "jsonwebtoken";



const app = express()

app.use(express.json());

app.use(
  (req, res, next) => {
    let token = req.header("Authorization")

    if (token != null) {
      token = token.replace("Bearer ", "");
      jwt.verify(token, "jwt-secret",
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


const connectionString = "mongodb+srv://admin:1234@cluster0.qvnn6qg.mongodb.net/?appName=Cluster0"

mongoose.connect(connectionString).then(
  () => {
    console.log("Database Connected")
  }
).catch((err) => {
  console.log("Database Connection Failed")

})
app.use("/user", userRouter)
app.use("/products", productRouter)

app.listen(5000,
  () => {
    console.log("Server is running on port 5000")
  })