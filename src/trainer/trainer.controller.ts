import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import TrainerService from "./trainer.service";
import { Trainer } from "./trainer.interface";

class TrainerController implements Controller {
  // public path = "/user";
  public path = "/trainer";
  public router = Router();
  public trainerService = new TrainerService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/filter`, this.getUsersByCity);
    this.router.get(`${this.path}/trainers`, this.getAllTrainers);
    this.router.put(`${this.path}/:id`, this.updateUser);
  }

  private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.trainerService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  private getUsersByCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const city: string = req.query.city;
      const users = await this.trainerService.getUsersByCity(city);
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  private getAllTrainers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainers = await this.trainerService.getAllTrainers();
      res.json(trainers);
    } catch (err) {
      next(err);
    }
  };

  private updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userData: Trainer = req.body;
      const user = await this.trainerService.updateUser(id, userData);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
}

export default TrainerController;
