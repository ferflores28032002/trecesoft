import express, { Router } from "express";
import cors from "cors";

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  public readonly port: number;
  public readonly routes: Router;

  constructor(options: Options) {
    const { port = 3120, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middleware

    // Configuración avanzada de CORS
    const corsOptions = {
      origin: '*', // o un dominio específico en lugar de '*'
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      credentials: true, // Si necesitas manejar cookies o autenticación
    };

    this.app.use(cors(corsOptions)); // Usa las opciones avanzadas de CORS
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Rutas
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port} 🚀`);
    });
  }
}
