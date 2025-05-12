import { Request, Response } from "express";
import client from "../helpers/Client";
import axios from "axios";
import { YOUTUBE_TRANS_URL,RAPID_API,RAPID_HOST } from "./dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChromaClient } from "chromadb";
import { CHROMA_DB_URL } from "./dotenv";
import { GEMINI_API_KEY } from "../helpers/dotenv";
const chromaclient=new ChromaClient({path:CHROMA_DB_URL})

const getTranscript = async (videoId: string) => {
    const options = {
        method: 'GET',
        url: YOUTUBE_TRANS_URL,
        params: { videoId: `${videoId}` },
        headers: {
            'x-rapidapi-key': RAPID_API,
            'x-rapidapi-host': RAPID_HOST
        }
    };

    try {
        const response = await axios.request(options);
        let tempString = "";
        for (let index = 0; index < response.data.transcript.length; index++) {
            tempString += response.data.transcript[index].text;
        }
        return tempString;
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw new Error('Failed to get transcript');
    }
};



const generateEmbedding = async (text: string) => {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    try {
        const embeddingResponse = await ai.models.embedContent({
            model: 'gemini-embedding-exp-03-07',
            contents: [text],
            config: { taskType: 'RETRIEVAL_QUERY' }
        });

        if (!embeddingResponse.embeddings) {
            throw new Error('No embeddings generated');
        }

        return embeddingResponse.embeddings[0].values;
    } catch (error) {
        console.error('Error generating embeddings:', error);
        throw new Error('Failed to generate embeddings');
    }
};

const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 10);};
     
const saveDataToCollection = async (userId: string, linkId: string, text: string, embedding: number[]) => {
    const randomId = generateRandomId();
    // console.log("chekc")
    const collection = await chromaclient.getCollection({ name: "youtube" });
    // console.log("ch")
    try {
        await collection.add({
            ids: [randomId],
            embeddings: [embedding],
            metadatas: [{ userId: `${userId}`, linkId: `${linkId}` }],
            documents: [text]
        });
        console.log("j")
    } catch (error) {
        console.error('Error saving data:', error);
        throw new Error('Failed to save data');
    }
};


const getFromFollection=async (embedding:number[]) => {
     const collection = await chromaclient.getCollection({ name: "youtube" });
   const result = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3,
    
})
return result
}

export{saveDataToCollection,getTranscript,generateEmbedding,getFromFollection}