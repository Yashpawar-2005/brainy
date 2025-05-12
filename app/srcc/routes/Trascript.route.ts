import { Router } from "express";
import { authcheck } from "../middlewares/authmiddleware";
import { search } from "../controllers/Transcript.controller";
const transcriptrouter=Router();

transcriptrouter.post("/search",authcheck,search)
export default transcriptrouter;