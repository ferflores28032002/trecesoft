import { AuthRepository } from "../../../repositories/auth.repository";

interface SendEmailPasswordUseCase {
  execute(email: string): Promise<void>;
}

export class SendEmail implements SendEmailPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string): Promise<void> {
    const response = await this.authRepository.sendEmail(email);
    return response;
  }
}
