import express, { Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import CreateUser from "users/createUser.interface";
import LogIn from "users/logIn.interface";
import AuthenticationService from "./authentication.service";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  public authenticationService = new AuthenticationService();
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
    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      res.setHeader("Set-Cookie", [cookie]);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingIn = async (req: Request, res: Response, next: NextFunction) => {
    const logInData: LogIn = req.body;
    try {
      const { cookie, user } = await this.authenticationService.loggingIn(logInData);
      res.setHeader("Set-Cookie", [cookie]);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingOut = (req: Request, res: Response) => {
    const cookie = this.authenticationService.loggingOut();
    res.setHeader("Set-Cookie", [cookie]);
    res.send(200);
  };
}

export default AuthenticationController;
