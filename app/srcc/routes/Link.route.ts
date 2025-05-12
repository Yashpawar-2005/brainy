import { Router } from "express";
import { createLink, deleteLink, gettranscript } from "../controllers/Link.controller";
import { authcheck } from "../middlewares/authmiddleware";
const LinkRouter=Router();

LinkRouter.post("/create",authcheck,createLink)
LinkRouter.delete("/delete",authcheck,deleteLink)
LinkRouter.get("/get",authcheck,gettranscript)
export default LinkRouter