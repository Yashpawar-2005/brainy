import expres, { application } from "express";
import { port,Start } from "./helpers/dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./db/DBconnect";
import authRoute from "./routes/Auth.route";
connect();
const app=expres();
app.use(expres.json())
app.use(cookieParser())
app.get(`${Start}/healthcheck`,(req,res)=>{
    console.log("hitting")
    res.json({message:"working"})
    
})
app.use(`${Start}/auth`,authRoute)
console.log(port)
app.listen(port|| 4000,()=>{
    console.log("lisening nicely")
})