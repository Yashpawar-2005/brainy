import { Router } from "express";
import { createLink, deleteLink } from "../controllers/Link.controller";
import { createTranscript } from "../middlewares/transmiddleware";
import { authcheck } from "../middlewares/authmiddleware";
const LinkRouter=Router();

LinkRouter.post("/create",authcheck,createTranscript,createLink)
LinkRouter.delete("/delete",authcheck,deleteLink)
LinkRouter.get("/get",authcheck,createTranscript)

export default LinkRouter