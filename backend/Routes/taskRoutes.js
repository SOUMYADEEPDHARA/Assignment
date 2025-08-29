import express from "express";
import { taskController } from "../controllers/taskController.js";
import { loginMiddleware } from "../middleware/loginMiddleware.js";

const router = express.Router();

// GET /tasks
router.get("/", loginMiddleware, taskController.list);

// POST /tasks
router.post("/", loginMiddleware, taskController.create);

// PUT /tasks/:id
router.put("/:id", loginMiddleware, taskController.update);

// DELETE /tasks/:id
router.delete("/:id", loginMiddleware, taskController.remove);

export default router;
