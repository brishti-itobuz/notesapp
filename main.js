import express from "express";

import route from "./routes/userRoute.js";
import {connectToDb} from "./config/dbConnection.js";

const app = express();

app.use(express.json())
app.use("/user", route);

const port = 3001;



app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});

connectToDb();



