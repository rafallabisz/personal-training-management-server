import postModel from "./post.model";

class PostService {
  public post = postModel;

  public getAllPosts = async () => {
    const posts = await this.post.find();
    return posts;
  };
}

export default PostService;
