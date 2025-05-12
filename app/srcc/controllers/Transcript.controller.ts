import { Request, Response } from "express";
import { generateEmbedding, getFromFollection } from "../helpers/Helperfunctions";
export const search=async(req:Request,res:Response)=>{
    const searching=req.body.search;
    const userId=req.userId;
   
    const embedding=await generateEmbedding(searching);
    if(!embedding){
        return
    }
    const data_from_chroma_db=await getFromFollection(embedding);
    res.json({message:data_from_chroma_db})
}