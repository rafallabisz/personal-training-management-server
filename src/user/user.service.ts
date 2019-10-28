import userModel from "./user.model";
import { User, UpdateUser } from "./user.interface";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class UserService {
  private user = userModel;

  public getAllUsers = async () => {
    const users = this.user.find();
    return users;
  };

  public updateUser = async (id: string, userData: UpdateUser) => {
    try {
      const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
      return user;
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };
}

export default UserService;
