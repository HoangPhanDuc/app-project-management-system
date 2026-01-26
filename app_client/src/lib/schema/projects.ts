import z from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  status: z.enum(["active", "completed", "archived"]),
});

export type FormDataProject = z.infer<typeof projectSchema>;