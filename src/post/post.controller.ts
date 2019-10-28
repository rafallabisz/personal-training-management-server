import express, { Request, Response, NextFunction } from "express";
import Post from "./post.interface";
import Controller from "../interfaces/controller.interface";
import PostService from "./post.service";

class PostController implements Controller {
  public path = "/posts";
  public router = express.Router();
  public postService = new PostService();

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

  private getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };

  private getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const post = await this.postService.getPostById(id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  };

  private modifyPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const postData: Post = req.body;
      const post = await this.postService.modifyPost(id, postData);
      res.json(post);
    } catch (err) {
      next(err);
    }
  };

  private createAPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postData: Post = req.body;
      const post = await this.postService.createPost(postData);
      res.json({ post });
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      await this.postService.deletePost(id);
      res.status(200).json(`Post deleted successfully! `);
    } catch (err) {
      next(err);
    }
  };
}

export default PostController;
