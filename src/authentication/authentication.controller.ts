import express, { Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import CreateUser from "user/createUser.interface";
import LogIn from "user/logIn.interface";
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
    this.router.delete(`${this.path}/:id`, this.deleteAccount);
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
    res.sendStatus(200);
  };

  private deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.authenticationService.deleteAccount(id);
      res.sendStatus(200).json(`Account deleted successfully!`);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthenticationController;
