import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
export const createNewUser = [
  async (req, _, next) => {
    const validationInput = [
      body("email")
        .isEmail()
        .isEmpty()
        .isString()
        .withMessage(
          "É necessário ter o email preenchido corretamente no formulário"
        ),
      body("password")
        .isEmpty()
        .isString()
        .withMessage("A senha não foi preenchida corretamente"),
    ];
    validationInput.forEach((validation) => validation.run(req));
    next();
  },
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        error: "É necessário ter o email e senha preenchidas no formulário",
      });
    }

    try {
      const emailDuplicate = await userModel.findOne({ email });
      if (emailDuplicate) {
        return res
          .status(409)
          .json({ error: "Não foi possível cadastrar o usuário" });
      }

      const newPasswordWithHash = await bcrypt.hash(password, 10);

      await userModel.create({
        email,
        password: newPasswordWithHash,
      });
      res.status(201).json({ msg: "User Created" });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para registrar o usuário.",
        details: error.message,
      });
    }
  },
];
