import userModel from "./user.model";
import { User } from "./user.interface";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class UserService {
  private user = userModel;

  public getAllUsers = async () => {
    const users = this.user.find();
    return users;
  };

  public updateUser = async (id: string, userData: User) => {
    try {
      const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
      return user;
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };

  public getUsersByCity = async (city: string) => {
    try {
      const users = this.user.find({ "data.city": city });
      await users.exec((err, data) => {
        return data;
      });
      return users;
    } catch (err) {
      throw err.value;
    }
  };
}

export default UserService;
