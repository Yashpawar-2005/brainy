import { NextFunction, Request, Response } from "express";
import client from "../helpers/Client";
import { responce } from "../helpers/responce";

import { deletelinkinterface, linkinterface } from "../helpers/Interface";
  import axios from 'axios';
     import { GoogleGenAI } from "@google/genai";
import { RAPID_API, RAPID_HOST, YOUTUBE_TRANS_URL } from "../helpers/dotenv";
import { ChromaClient } from "chromadb";
import { CHROMA_DB_URL } from "../helpers/dotenv";
import { string } from "zod";
import { generateEmbedding,getTranscript,saveDataToCollection } from "../helpers/Helperfunctions";




const createsharable=async (req:Request,res:Response) => {
}

const deleteLink=async (req:Request,res:Response) => {
    try {
        
        deletelinkinterface.parse(req.body)
        const linkId=req.body.linkId
        const userId=req.userId
        const datq=client.link.delete({
            where:{
                id:linkId
            }
        })
        res.status(200).json(responce({status:200,frontend:"deleted Link",data:datq,message:"nicley done"}))
        return
        
    } catch (error) {
         res.status(500).json(responce({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        }));
        return
    }
}














const createLink = async (req: Request, res: Response) => {
    console.log("hitting")
    const { userId, linkId } = req;
    const { videoId } = req.body;

    if (!userId) {
        res.status(400).json({
            status: 400,
            message: "Missing userId",
            data: null,
            frontend: "UserId is required"
        });
        return 
    }

    try {
        const tempString = await getTranscript(videoId);
        console.log("1st")
        const embedding = await generateEmbedding(tempString);
        console.log("2nd")
        // console.log(linkId,embedding)
        if(!linkId || !embedding){
            return
        }
        // console.log("hi")
        await saveDataToCollection(userId, linkId, tempString, embedding);
        console.log("3rd")
        res.status(200).json({
            status: 200,
            message: "Nicely done",
            data: null,
            frontend: "Created the link"
        });
    } catch (error) {
        console.error('Error in creating link:', error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        });
    }
};

export default createLink;

export {createLink,deleteLink}
