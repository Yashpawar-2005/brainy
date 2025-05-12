import { Router } from "express";
import { createLink, deleteLink } from "../controllers/Link.controller";
import { createTranscript } from "../middlewares/transmiddleware";
import { authcheck } from "../middlewares/authmiddleware";
import { getalllinks } from "../controllers/Link.controller";
const LinkRouter=Router();

LinkRouter.post("/create",authcheck,createTranscript,createLink)
LinkRouter.delete("/delete",authcheck,deleteLink)
LinkRouter.get("/get",authcheck,createTranscript)
LinkRouter.get("/all_links",authcheck,getalllinks)
export default LinkRouter