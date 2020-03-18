import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";
// import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import config from "../config";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeSwagger();
  }

  public listen() {
    const port = config.port;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  private initializeSwagger() {
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private connectToTheDatabase() {
    mongoose
      .connect(config.databaseUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(db => console.log("DB is connected"))
      .catch(err => console.log(err, "Error in connecting with DB"));
  }
}

export default App;
