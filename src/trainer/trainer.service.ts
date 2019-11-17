import trainerModel from "./trainer.model";
import { Trainer } from "./trainer.interface";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import HttpException from "../exceptions/HttpException";
import * as bcrypt from "bcrypt";

class TrainerService {
  private trainer = trainerModel;

  public getAllUsers = async () => {
    const users = this.trainer.find();
    return users;
  };

  public getUsersByCity = async (city: string) => {
    try {
      const users = this.trainer.find({ "data.city": city });
      await users.exec((err, data) => data);
      return users;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };

  public getAllTrainers = async () => {
    try {
      const trainers = this.trainer.find({ isTrainer: true }).populate("offers comments");
      await trainers.exec((err, data) => data);
      return trainers;
    } catch (err) {
      throw new HttpException(500, err.value);
    }
  };

  public updateUser = async (id: string, trainerData: Trainer) => {
    try {
      const hashedPassword = await bcrypt.hash(trainerData.password, 10);
      let user = await this.trainer.findByIdAndUpdate(
        id,
        {
          ...trainerData,
          password: hashedPassword
        },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };
}

export default TrainerService;
