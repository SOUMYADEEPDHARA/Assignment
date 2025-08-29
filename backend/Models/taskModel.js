import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1, "title is required"),
  status: z.enum(["pending", "completed"]).optional().default("pending"),
});

export const updateTaskSchema = z.object({
  status: z.enum(["pending", "completed"], {
    required_error: "status is required",
  }),
});