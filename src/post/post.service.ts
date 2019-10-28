import postModel from "./post.model";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Post from "./post.interface";

class PostService {
  private post = postModel;

  public getAllPosts = async () => {
    const posts = await this.post.find();
    return posts;
  };

  public getPostById = async (id: string) => {
    try {
      const post = await this.post.findById(id);
      return post;
    } catch (err) {
      throw new PostNotFoundException(err.value);
    }
  };
  public modifyPost = async (id: string, postData: Post) => {
    try {
      const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
      return post;
    } catch (err) {
      throw new PostNotFoundException(err.value);
    }
  };

  public createPost = async (postData: Post) => {
    const createdPost = new this.post(postData);
    const post = await createdPost.save();
    return post;
  };

  public deletePost = async (id: string) => {
    try {
      await this.post.findByIdAndDelete(id);
    } catch (err) {
      throw new PostNotFoundException(err.value);
    }
  };
}

export default PostService;
