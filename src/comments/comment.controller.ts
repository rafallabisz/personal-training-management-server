import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import CommentService from "./comment.service";
import { NewComment } from "./comment.interface";

class CommentController implements Controller {
  public path = "/trainer";
  public router = Router();
  public commentService = new CommentService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/:trainerId/comments`)
      .get(this.getTrainerComments)
      .post(this.newTrainerComment);
  }

  private getTrainerComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const comments = await this.commentService.getTrainerComments(trainerId);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  };

  private newTrainerComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const newComment: NewComment = req.body;
      const comment = await this.commentService.newTrainerComment(trainerId, newComment);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  };
}

export default CommentController;
