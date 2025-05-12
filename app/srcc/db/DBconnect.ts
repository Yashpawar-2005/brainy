import client from "../helpers/Client";
import { ChromaClient } from "chromadb";
import { CHROMA_DB_URL } from "../helpers/dotenv";
const clientt = new ChromaClient( {path:CHROMA_DB_URL});

const connect=async()=>{
    try {
        await client.$connect();
        console.log("connected");
    } catch (error) {
        console.log("error while connecting")
    }
}
const connectchroma = async () => {
    try {
        let youtubechroma = await clientt.getCollection({name:"youtube"}).catch(()=> null);
        if (!youtubechroma) {
            youtubechroma = await clientt.createCollection({name:"youtube"});
            console.log("YouTube collection created");
        } else {
            console.log("YouTube collection already exists");
        }

        let twitterchroma = await clientt.getCollection({name:"twitter"}).catch(()=> null);
        if (!twitterchroma) {
            twitterchroma = await clientt.createCollection({name:"twitter"});
            console.log("Twitter collection reated");
        } else {
            console.log("Twitter collection already exists");
        }

        return {youtubechroma, twitterchroma};
    } catch (error) {
        console.log(error);
        console.log("Error while connecting");
    }
};



export {connect,connectchroma}