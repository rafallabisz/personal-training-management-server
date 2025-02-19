import HttpException from "../exceptions/HttpException";
import commentModel from "./comment.model";
import { NewComment } from "./comment.interface";
import trainerModel from "../trainer/trainer.model";

class CommentService {
  private comment = commentModel;
  private user = trainerModel;

  public getTrainerComments = async (trainerId: string) => {
    const trainer = await this.user.findById(trainerId).populate("comments");
    const comments = trainer!.comments;
    return comments;
  };

  public newTrainerComment = async (trainerId: string, comment: NewComment) => {
    try {
      //create newComment
      const newComment = new this.comment(comment);
      //get trainer
      const trainer = await this.user.findById(trainerId);
      if (trainer) {
        //assign trainer as comment trainer
        newComment.trainer = trainer;
        await newComment.save();
        //add comment to the trainer comments array 'comments'
        trainer.comments.push(newComment);
        await trainer.save();
        return trainer;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };
}

export default CommentService;
