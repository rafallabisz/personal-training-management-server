import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import trainerModel from "../trainer/trainer.model";
import userModel from "../user/user.model";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import { Trainer } from "../trainer/trainer.interface";
import TokenData from "../interfaces/tokenData.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import { CreateUser, LogIn } from "./authentication.interface";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class AuthenticationService {
  private trainer = trainerModel;
  private user = userModel;

  public register = async (registerData: CreateUser) => {
    if (await this.trainer.findOne({ email: registerData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(registerData.email);
    }
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    const user = await this.trainer.create({
      ...registerData,
      password: hashedPassword
    });
    user.password = "undefined";
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user
    };
  };

  public loggingIn = async (logInData: LogIn) => {
    const user = await this.trainer.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = "undefined";
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return {
          cookie,
          user
        };
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  };

  public loggingOut = () => {
    const cookie = `Authoriazation=Max-age=0`;
    return cookie;
  };

  public createToken = (user: Trainer): TokenData => {
    const expiresIn = 60 * 60; //an hour
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  };

  public createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  };

  public deleteAccount = async (id: string) => {
    try {
      await this.trainer.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };
}

export default AuthenticationService;
