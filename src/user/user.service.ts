import userModel from "./user.model";
import { User, OfferDescription } from "./user.interface";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import HttpException from "../exceptions/HttpException";

class UserService {
  private user = userModel;

  public getAllUsers = async () => {
    const users = this.user.find();
    return users;
  };

  public getUsersByCity = async (city: string) => {
    try {
      const users = this.user.find({ "data.city": city });
      await users.exec((err, data) => data);
      return users;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };

  public updateUser = async (id: string, userData: User) => {
    try {
      const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
      return user;
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };

  public updateOffer = async (id: string, description: OfferDescription) => {
    try {
      const user = await this.user.findByIdAndUpdate(id, { $push: { offers: description } }, { new: true });

      return user;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };
}

export default UserService;
