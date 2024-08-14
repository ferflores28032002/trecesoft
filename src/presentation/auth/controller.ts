import { Request, Response } from "express";

import {
  AuthRepository,
  CustomError,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
  UpdateUserDto,
} from "../../domain";

import UserModel from "../../data/postgres/models/user.model";
import { ChangePassword } from "../../domain/use-cases/auth/users/changePassword-use-case";
import { DeleteUser } from "../../domain/use-cases/auth/users/delete.use-case";
import { LoginUser } from "../../domain/use-cases/auth/users/login.use-case";
import { SendEmail } from "../../domain/use-cases/auth/users/sendEmail.use-case";
import { UpdateUser } from "../../domain/use-cases/auth/users/update.use-case";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handlerError(error, res));
  };

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handlerError(error, res));
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.findAll({
        include: [{ association: "role" }],
        attributes: { exclude: ["password", "roleId"] },
      });
      res.json({ users });
    } catch (error) {
      this.handlerError(error, res);
    }
  };

  sendEmailPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      new SendEmail(this.authRepository).execute(email);

      return res
        .status(200)
        .json({ message: "Correo de recuperación enviado" });
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const [error, updateUserDto] = UpdateUserDto.update(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      new UpdateUser(this.authRepository)
        .execute(updateUserDto!)
        .then((user) => res.json(user))
        .catch((error) => this.handlerError(error, res));
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      new DeleteUser(this.authRepository)
        .execute(id)
        .then(() => res.json({ message: "Usuario eliminado" }))
        .catch((error) => this.handlerError(error, res));
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { id, password, token } = req.body;
      new ChangePassword(this.authRepository)
        .execute(password, token)
        .then(() => res.json({ message: "Contraseña actualizada" }))
        .catch((error) => this.handlerError(error, res));
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
