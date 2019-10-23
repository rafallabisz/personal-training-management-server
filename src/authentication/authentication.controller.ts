import * as bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import Controller from "../interfaces/controller.interface";
import userModel from "../users/user.model";
import User from "../users/user.interface";
import TokenData from "interfaces/tokenData.interface";
import DataStoredInToken from "interfaces/dataStoredInToken";
import CreateUser from "users/createUser.interface";
import LogIn from "users/logIn.interface";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUser = req.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword
      });
      user.password = "undefined";
      const tokenData = this.createToken(user);
      res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      res.json(user);
    }
  };

  private loggingIn = async (req: Request, res: Response, next: NextFunction) => {
    const logInData: LogIn = req.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = "undefined";
        const tokenData = this.createToken(user);
        res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        res.json(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (req: Request, res: Response) => {
    res.setHeader("Set-Cookie", [`Authoriazation=Max-age=0`]);
    res.send(200);
  };

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; //an hour
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthenticationController;
