
import { z } from "zod";

const signupinteface = z.object({
  username: z.string(),
  password:z.string(),
  email:z.string().email()
});
const signininteface = z.object({
    
    password:z.string(),
   username:z.string()
  });
export {signupinteface,signininteface}