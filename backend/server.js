import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());



import loginRoutes from "./Routes/loginRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import { notFound } from "./middleware/notFound.js";



app.get("/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() })
);

app.use("/", loginRoutes);
app.use("/tasks", taskRoutes);

app.use(notFound);



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



