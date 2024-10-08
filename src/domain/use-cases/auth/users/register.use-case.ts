import { JwtAdapter } from "../../../../config/jwt";
import { RegisterUserDto } from "../../../dtos/auth/register-user.dto";
import { CustomError } from "../../../errors/custom.error";
import { AuthRepository } from "../../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    is_active: boolean;
    roleId: number;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);

    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error to generate token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        is_active: user.is_active,
        roleId: user.roleId,
      },
    };
  }
}
