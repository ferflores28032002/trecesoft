import { AuthRepository } from "../../../repositories/auth.repository";

interface UpdateUseCase {
  execute(id: string, password: string, token: string): Promise<string>;
}

export class ChangePassword implements UpdateUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(password: string, token: string): Promise<string> {
    await this.authRepository.ChangePassword(password, token);
    return "Password changed successfully";
  }
}
