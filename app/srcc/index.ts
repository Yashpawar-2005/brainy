import expres, { application } from "express";
import { port,Start } from "./helpers/dotenv";
import cookieParser from "cookie-parser";
import { connect,connectchroma } from "./db/DBconnect";
import authRoute from "./routes/Auth.route";
import LinkRouter from "./routes/Link.route";
import transcriptrouter from "./routes/Trascript.route";
import cors from 'cors'
connect();
connectchroma();
const app=expres();
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    expres.json()(req, res, next); // Only parse JSON for POST, PUT, PATCH
  } else {
    next(); // Skip JSON parsing for GET and other methods
  }
});
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.get(`${Start}/healthcheck`,(req,res)=>{
    console.log("hitting")
    res.json({message:"working"})
    
})
app.use(`${Start}/auth`,authRoute)
app.use(`${Start}/link`,LinkRouter)
app.use(`${Start}/trans`,transcriptrouter)
console.log(port)
app.listen(port|| 4000,()=>{
    console.log("lisening nicely")
})