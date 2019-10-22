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
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.put(`${this.path}/:id`, this.modifyPost);
    this.router.post(this.path, this.createAPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private getAllPosts = async (req: Request, res: Response): Promise<void> => {
    const posts = await this.post.find();
    res.json(posts);
  };

  private getPostById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await this.post.findById(id);
    res.json(post);
  };

  private modifyPost = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const postData: Post = req.body;
    const modifyPost = await this.post.findByIdAndUpdate(id, postData, { new: true });
    res.json(modifyPost);
  };

  private createAPost = async (req: Request, res: Response): Promise<void> => {
    const postData: Post = req.body;
    const createdPost = new this.post(postData);
    await createdPost.save();
    res.json({ data: createdPost });
  };

  private deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await this.post.findByIdAndDelete(id);
      res.status(200).json(`Post deleted successfully! `);
    } catch {
      res.status(404).json(`An error occurred!`);
    }
  };
}

export default PostsController;
