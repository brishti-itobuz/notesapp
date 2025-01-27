import express from "express";
import dotenv from "dotenv/config";

import route from "./routes/userRoute.js";
import { connectToDb } from "./config/dbConnection.js";

const app = express();

app.use(express.json());
app.use("/user", route);

const port = process.env.PORT



app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});

connectToDb();
