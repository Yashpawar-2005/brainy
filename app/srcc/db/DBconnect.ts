import client from "../helpers/Client";

const connect=async()=>{
    try {
        await client.$connect();
        console.log("connected");
    } catch (error) {
        console.log("error while connecting")
    }
}
export {connect}