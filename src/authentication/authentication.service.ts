import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import userModel from "../user/user.model";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import { User } from "../user/user.interface";
import TokenData from "../interfaces/tokenData.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import { CreateUser, LogIn } from "../user/user.interface";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class AuthenticationService {
  public user = userModel;

  public register = async (userData: CreateUser) => {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
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
    const user = await this.user.findOne({ email: logInData.email });
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

  public createToken = (user: User): TokenData => {
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
      await this.user.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new UserNotFoundException(err.value);
    }
  };
}

export default AuthenticationService;
