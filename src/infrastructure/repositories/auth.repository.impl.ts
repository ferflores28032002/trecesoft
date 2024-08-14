import {
  AuthDatasource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
  sendEmail(email: string): Promise<void> {
    return this.authDatasource.sendEmail(email);
  }
  update(updateUserDto: UpdateUserDto): Promise<string> {
    return this.authDatasource.update(updateUserDto);
  }
  delete(id: string): Promise<string> {
    return this.authDatasource.delete(id);
  }
  ChangePassword(password: string, token: string): Promise<string> {
    return this.authDatasource.ChangePassword(password, token);
  }
}
