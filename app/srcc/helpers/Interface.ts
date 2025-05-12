
import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      linkId?:string;
    }
  }
}
const signupinteface = z.object({
  username: z.string(),
  password:z.string(),
  email:z.string().email()
});
const signininteface = z.object({
    
    password:z.string(),
  //  username:z.string(),
   email:z.string(),
  });

const linkinterface = z.object({
    Link: z.string(),
    title: z.string(),
    type:z.string(),
});
const deletelinkinterface = z.object({
    id: z.number()
});
export {signupinteface,signininteface,linkinterface,deletelinkinterface}