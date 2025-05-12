import { Request, Response } from "express";
import client from "../helpers/Client";
import { responce } from "../helpers/responce";
import { GEMINI_API_KEY } from "../helpers/dotenv";
import { deletelinkinterface, linkinterface } from "../helpers/Interface";
  import axios from 'axios';
     import { GoogleGenAI } from "@google/genai";
import { RAPID_API, RAPID_HOST, YOUTUBE_TRANS_URL } from "../helpers/dotenv";



const createLink=async (req:Request,res:Response) => {
    try {
        const link = linkinterface.parse(req.body);
        const InputData=req.body.Link;
        const input=req.body.type;
        const userId=req.userId
        console.log(input,InputData,userId)
        if(!userId){
            return
        }
        const datq=client.link.create({
            data:{
                linkUrl:InputData,
                type:input,
                userid:parseInt(userId)
            }
        })
        res.status(200).json(responce({status:200,frontend:"Created Link",data:datq,message:"nicley done"}))
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









const gettranscript=async (req:Request,res:Response) => {
    console.log("hitting")
    const userId=req.userId;
const options = {
  method: 'GET',
  url: YOUTUBE_TRANS_URL,
  params: {
    videoId: '5RT6QMKJTjQ'
  },
  headers: {
    'x-rapidapi-key': RAPID_API,
    'x-rapidapi-host': RAPID_HOST
  }
};

try {
    let tempstring=""
    console.log("started")
	const response = await axios.request(options);
	console.log(response.data);
    for (let index = 0; index < response.data. transcript.length; index++) {
        tempstring+=response.data. transcript[index].text   
    }
    // const result = await collection.add({
    //         ids: new Array(embeddings.length).fill(userId), // Set the user ID for all embeddings
    //         embeddings: embeddings,                        // The embedding data
    //         metadatas: new Array(embeddings.length).fill({ user_id: userId }), // User ID metadata
    //         documents: documents                          // The documents associated with each embedding
    //     });




 
async function main() {
    const ai = new GoogleGenAI({ apiKey:  GEMINI_API_KEY });

    try {
        const response = await ai.models.embedContent({
            model: 'gemini-embedding-exp-03-07',
            contents: [tempstring],
            config: {
                taskType: 'RETRIEVAL_QUERY',
            },
        });

        console.log(response.embeddings);
        res.json({message:response.embeddings})
        return
    } catch (error) {
        console.error('Error generating embeddings:', error);
    }
}

main();

} catch (error) {
	console.error(error);
}
}
export {createLink,gettranscript,deleteLink}
