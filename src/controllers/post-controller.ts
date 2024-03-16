import { Request, Response } from "express";
import { TPost } from "../types";
import { isPost } from "../utils/validators";

const posts: TPost[] = [];

export class PostController {
    createPost = async (req: Request, res: Response) => {
        const post = (await req.body) as TPost;

        if (!isPost(post))
            return res.status(400).json({
                error: "Invalid Post Body : " + JSON.stringify(post, null, 2),
            });

        posts.push(post);

        res.status(201).json(post);
    };
}
