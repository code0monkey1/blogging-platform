import { Router } from "express";
import { PostController } from "../controllers/post-controller";

const route = Router();

const postController = new PostController();

route.post("/", postController.createPost);

export default route;
