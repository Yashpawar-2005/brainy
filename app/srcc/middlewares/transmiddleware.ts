import { linkinterface } from "../helpers/Interface";
import { Request,Response,NextFunction } from "express";
import client from "../helpers/Client";
import { generateEmbedding } from "../helpers/Helperfunctions";
import { responce } from "../helpers/responce";
const createTranscript=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const link = linkinterface.parse(req.body);
        const InputData=req.body.Link;
        const input=req.body.type;
        const userId=req.userId
        console.log(input,InputData,userId)
        if(!userId){
            return
        }
        const datq=await client.link.create({
            data:{
                linkUrl:InputData,
                type:input,
                userid:parseInt(userId)
            }
        })
        req.linkId=`${datq.id}`
        next();
        // res.status(200).json(responce({status:200,frontend:"Created Link",data:datq,message:"nicley done"}))
        // return
    } catch (error) {
        console.log(error)
         res.status(500).json(responce({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        }));
        return
    }
}

export { createTranscript}