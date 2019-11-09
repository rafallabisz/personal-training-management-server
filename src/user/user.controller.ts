import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import UserService from "./user.service";
import { User, OfferDescription } from "./user.interface";

class UserController implements Controller {
  public path = "/user";
  public router = Router();
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/filter`, this.getUsersByCity);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.post(`${this.path}/offer/:id`, this.addOffer);
  }

  private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  private getUsersByCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const city: string = req.query.city;
      const users = await this.userService.getUsersByCity(city);
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  private updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userData: User = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  private addOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const offers: OfferDescription = req.body;
      const user = await this.userService.updateOffer(id, offers);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
