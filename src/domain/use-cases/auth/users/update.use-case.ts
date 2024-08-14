import { UpdateUserDto } from "../../../dtos/auth/update-user.dto";

import { AuthRepository } from "../../../repositories/auth.repository";

interface UpdateUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<string>;
}

export class UpdateUser implements UpdateUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<string> {
    await this.authRepository.update(updateUserDto);
    return "User updated successfully";
  }
}
