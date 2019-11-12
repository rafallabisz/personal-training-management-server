import HttpException from "../exceptions/HttpException";
import commentModel from "./comment.model";
import { NewComment } from "./comment.interface";
import userModel from "../user/user.model";

class CommentService {
  private comment = commentModel;
  private user = userModel;

  public getAllUgetTrainerCommentssers = async () => {
    // const users = this.user.find();
    // return users;
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
