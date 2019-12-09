import userModel from "./user.model";
import { User } from "./user.interface";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import HttpException from "../exceptions/HttpException";
import * as bcrypt from "bcrypt";

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

  public getAllTrainers = async () => {
    try {
      const trainers = this.user.find({ isTrainer: true }).populate("offers comments");
      await trainers.exec((err, data) => data);
      return trainers;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };

  public updateUser = async (id: string, userData: User) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      let user = await this.user.findByIdAndUpdate(
        id,
        {
          ...userData,
          password: hashedPassword
        },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };

  public getTrainerById = async (trainerId: string) => {
    try {
      const trainer = await this.user.findById(trainerId).populate("offers comments");
      return trainer;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };
}

export default UserService;
