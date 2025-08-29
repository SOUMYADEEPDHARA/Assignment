import express from "express";

const app = express();
const PORT = 3000;




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



