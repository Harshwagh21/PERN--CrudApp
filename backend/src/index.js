import express from "express";
import cors from "cors";
import clientroutes from "./routes/clientroutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/", clientroutes);

app.listen(port, () => {
  console.log("listening on port 3000");
});
