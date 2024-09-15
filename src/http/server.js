import express from "express";
const app = express();
import compression from "compression";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "../routes/v1/index.js";
import cors from "cors";

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3333",
    optionsSuccessStatus: 200,
  })
);
app.disable("x-powered-by");

app.use("/api/v1", (req, _, next) => {
  console.log(`Path: ${req.path} | Method: ${req.method}`);
  next();
});
app.use("/api/v1", router);

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.NAME_DB,
  })
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((error) => {
    console.log(
      `Não foi possível sincronizar com o bando de dados.`,
      error.message
    );
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
