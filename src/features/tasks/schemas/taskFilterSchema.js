import { z } from "zod";

export const taskFilterSchema = z.object({
  search: z.string().max(50).optional().default(""),
  status: z.enum(["all", "todo", "in-progress", "blocked", "done"]),
  priority: z.enum(["all", "low", "medium", "high"]),
});
