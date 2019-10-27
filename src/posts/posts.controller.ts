import express, { Request, Response, NextFunction } from "express";
import Post from "./post.interface";
import Controller from "../interfaces/controller.interface";
import postModel from "./posts.model";
import PostNotFoundException from "../exceptions/PostNotFoundException";
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

  private getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const post = await this.post.findById(id);
      res.json(post);
    } catch (err) {
      next(new PostNotFoundException(err.value));
    }
  };

  private modifyPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const postData: Post = req.body;
      const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
      res.json(post);
    } catch (err) {
      next(new PostNotFoundException(err.value));
    }
  };

  private createAPost = async (req: Request, res: Response): Promise<void> => {
    const postData: Post = req.body;
    const createdPost = new this.post(postData);
    const post = await createdPost.save();
    res.json({ post });
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      await this.post.findByIdAndDelete(id);
      res.status(200).json(`Post deleted successfully! `);
    } catch (err) {
      next(new PostNotFoundException(err.value));
    }
  };
}

export default PostsController;
