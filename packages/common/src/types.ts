import z from "zod"

export const CreateUserSchema = z.object({
    email:z.string().max(150).email(),
    password:z.string().min(8).max(150),
    username:z.string().min(3).max(150).trim()
})

export const LoginUserSchema = z.object({
    email:z.string().max(150).email(),
    password:z.string().min(8).max(150),
})