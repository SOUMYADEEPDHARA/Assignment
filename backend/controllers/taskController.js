import { createSchema, updateSchema } from "./models/taskModel.js";

let tasks = [];
let nextId = 1;

export const taskController = {
  // GET /tasks
  list: (req, res) => res.json(tasks),

  // POST /tasks
  create: (req, res) => {
    const parse = createSchema.safeParse(req.body);
    if (!parse.success)
      return res
        .status(400)
        .json({ error: "Validation error", details: parse.error.flatten() });

    const { title, status } = parse.data;
    const newTask = {
      id: nextId++,
      title,
      status,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  },

  // PUT /tasks/:id
  update: (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0)
      return res.status(400).json({ error: "Invalid task id" });

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const parse = updateSchema.safeParse(req.body);
    if (!parse.success)
      return res
        .status(400)
        .json({ error: "Validation error", details: parse.error.flatten() });

    task.status = parse.data.status;
    res.json(task);
  },

  // DELETE /tasks/:id
  remove: (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0)
      return res.status(400).json({ error: "Invalid task id" });

    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ error: "Task not found" });

    const [deleted] = tasks.splice(idx, 1);
    res.json({ success: true, deleted });
  },
};
