import path from "path";

import { BcryptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwt";

import UserModel from "../../data/postgres/models/user.model";
import EmailService from "../../utils/resend.config";

import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UpdateUserDto,
  UserEntity,
} from "../../domain";

import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, username, roleId } = registerUserDto;

    try {
      const existEmail = await UserModel.findOne({ where: { email } });
      if (existEmail) throw CustomError.badRequest("User alredy exists");

      const user = await UserModel.create({
        name,
        username,
        email,
        roleId,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({
        where: { email },
        include: ["role"],
      });

      if (!user) throw CustomError.badRequest("User not found");

      const isValid = this.comparePassword(password, user.password);
      if (!isValid) throw CustomError.badRequest("Invalid password");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }

  async sendEmail(email: string): Promise<void> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) throw CustomError.notFound("Usuario no encontrado");

    const token = await JwtAdapter.generateToken({ id: user.id }, "2h");

    const emailTemplatePath: string = path.join(
      __dirname,
      "..",
      "..",
      "utils",
      "templates",
      "reset-password.html"
    );

    let emailTemplate: string = EmailService.loadTemplate(emailTemplatePath);

    const resetUrl = `${envs.URL_FRONTEND}?token=${token}`;
    emailTemplate = emailTemplate.replace("{{resetUrl}}", resetUrl);

    const emailService = new EmailService();

    await emailService.sendEmail({
      from: envs.SMTP_USER,
      to: [email],
      subject: "Recuperación de Contraseña",
      html: emailTemplate,
    });
  }

  async update(updateUserDto: UpdateUserDto): Promise<string> {
    const { id, name, email, username, roleId, password, newPassword } =
      updateUserDto;

    try {
      const user = await UserModel.findByPk(id);

      if (!user) throw CustomError.notFound("User not found");

      if (password && newPassword) {
        const isValid = this.comparePassword(password, user.password);
        if (!isValid) throw CustomError.badRequest("Invalid password");
        user.password = this.hashPassword(newPassword);
      } else if (password && !newPassword) {
        // Lanzar un error si `password` se proporciona sin `newPassword`.
        throw CustomError.badRequest(
          "New password is required to update password"
        );
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (username) user.username = username;
      if (roleId) user.roleId = roleId;

      await user.save();
      return "User updated successfully";
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const user = await UserModel.findByPk(id);

      if (!user) throw CustomError.notFound("User not found");

      user.is_active = false;

      await user.save();

      return "User deleted successfully";
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }

  async ChangePassword(password: string, token: string): Promise<string> {
    try {
      const payload = await JwtAdapter.validateToken<{ id: number | string }>(
        token
      );
      if (!payload) return "Invalid Token";

      const user = await UserModel.findByPk(payload.id);

      if (!user) return "Invalid Token - User not found";

      user.password = this.hashPassword(password);

      await user.save();

      return "Password changed successfully";
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }
}
