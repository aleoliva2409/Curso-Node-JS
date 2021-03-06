import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/users.routes';
import db from '../db/db-connect';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.dbConnection()
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log('database online');
    } catch (err) {
      throw new Error(String(err))
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura de body
    this.app.use(express.json());

    //Carpeta Publica
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
