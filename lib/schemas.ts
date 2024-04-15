import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4, { message: "Minimum of 4 characters required" }),
  description: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
