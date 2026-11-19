import express from "express";
import clientesRouter from "./routes/clientes.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/clientes", clientesRouter);

app.use(errorHandler);

export default app;
