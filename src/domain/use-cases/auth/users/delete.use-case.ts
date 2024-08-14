import { AuthRepository } from "../../../repositories/auth.repository";

interface DeleteUseCase {
  execute(id: string): Promise<string>;
}

export class DeleteUser implements DeleteUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(id: string): Promise<string> {
    await this.authRepository.delete(id);
    return "User deleted successfully";
  }
}
