import * as z from "zod";


//auth schema validations
export const signupSchema = z.object({
  firstName: z.string().min(2,"First name should be at least 2 character"),
  lastName:z.string().min(2,"Last name should be at least 2 character"),
  email:z.email("Invalid email"),
  password: z.string().min(6,"Password must be at least 8 characters").regex(/[A-Za-z]/, "Password must contain at least one alphabet letter").regex(/0-9/,"Password must contain at least one numeric letter" ),
});


export const loginSchema = z.object({
    email:z.email("invalid email"),
    password:z.string().min(1,"password is required")
})