import express from "express";
import cors from "cors";
import clientesRouter from "./routes/clientes.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
// autoriza o frontend a acessar a API.
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
}));

app.use(express.json());
app.use(logger);

app.use("/clientes", clientesRouter);

app.use(errorHandler);

export default app;