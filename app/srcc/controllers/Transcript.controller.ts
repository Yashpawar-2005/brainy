import { Request, Response } from "express";
import { generateEmbedding, getFromFollection } from "../helpers/Helperfunctions";
import client from "../helpers/Client";
export const search=async(req:Request,res:Response)=>{
    const searching=req.body.search;
    const userId=req.userId;
   
    const embedding=await generateEmbedding(searching);
    if(!embedding){
        return
    }
    if(!userId)return;
    const data_from_chroma_db=await getFromFollection(embedding);
    const linkIds = data_from_chroma_db.metadatas[0]
  .map((meta: any) => parseInt(meta.linkId))
  .filter((id) => !isNaN(id));

if (linkIds.length === 0) {
    res.json({ message: "No valid results found.", links: [] });
  return 
}

    const links = await client.link.findMany({
      where: {
        id: {
          in: linkIds
        },
        userid: parseInt(userId)  
      }
    });

    res.json({ message: "Success", data:links, chromaMeta: data_from_chroma_db.metadatas });
    return 
}