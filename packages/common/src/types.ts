import z from "zod";

export const CreateUserSchema = z.object({
  email: z.string().max(150).email(),
  password: z.string().min(8).max(150),
  username: z.string().min(3).max(150).trim(),
});

export const LoginUserSchema = z.object({
  email: z.string().max(150).email(),
  password: z.string().min(8).max(150),
});

const pointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const strokeSchema = z.object({
  tool: z.enum(["brush", "eraser"]),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  size: z.number().min(1).max(100),
  point: z.array(pointSchema).min(1),
});

const dataSchema = z.object({
  width: z.number().min(10).max(5000),
  height: z.number().min(10).max(5000),
  background: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  strokes: z.array(strokeSchema).min(1),
});

export const DrawingSchema = z.object({
  title: z.string().max(100).optional(),
  data: dataSchema,
  thumbnail: z.string().optional(),
  isPublic: z.boolean().optional(),
  userId: z.string(),
});

export const UpdateDrawingSchema = z.object({
  title: z.string().max(100).optional(),
  data: dataSchema.optional(),
  thumbnail: z.string().optional(),
  isPublic: z.boolean().optional(),
});
