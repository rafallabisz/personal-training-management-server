import express, { Request, Response } from "express";
import Post from "./post.interface";
import Controller from "../interfaces/controller.interface";
import postModel from "./posts.model";

class PostsController implements Controller {
  public path = "/posts";
  public router = express.Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }

  private getAllPosts = async (req: Request, res: Response): Promise<void> => {
    const posts = await this.post.find();
    res.json(posts);
    /*
    this.post.find()
    .then(posts=> {
      res.send(posts)
    })
    */
  };

  private createAPost = async (req: Request, res: Response) => {
    const postData: Post = req.body;
    const createdPost = new this.post(postData);
    // createdPost.save().then(savedPost=>{
    //   res.send(savedPost)
    // })
    await createdPost.save();
    res.json({ data: createdPost });
  };
}

export default PostsController;
