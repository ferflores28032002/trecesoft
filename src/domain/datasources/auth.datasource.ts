import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UpdateUserDto } from "../dtos/auth/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract sendEmail(email: string): Promise<void>;

  abstract update(updateUserDto: UpdateUserDto): Promise<string>;

  abstract delete(id: string): Promise<string>;

  abstract ChangePassword(password: string, token: string): Promise<string>;
}
