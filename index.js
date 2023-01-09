

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 5000;


const CONNECTION = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  
  }
}






// routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";


CONNECTION().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})




app.use(express.static(path.join(process.cwd() + "/public")));
// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder

dotenv.config();

// app.use(express.static("/public"));
app.use("/images", express.static("images"));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
