import express from "express";
import cors from "cors";
import tutoresRouter from "./routes/tutores.js";
import animaisRouter from "./routes/animais.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
  ],
}));

app.use(express.json());
app.use(logger);

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Pet Shop funcionando!",
    rotas: {
      tutores: "/tutores",
      animais: "/animais",
    },
  });
});

// Rotas principais
app.use("/tutores", tutoresRouter);
app.use("/animais", animaisRouter);

// Tratamento centralizado de erros
app.use(errorHandler);

export default app;