import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public roleId: number
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, username, roleId } = object;

    if (!name) return ["Missing name"];
    if (!username) return ["Missing username"];
    if (!email) return ["Missing email"];
    if (!roleId) return ["Missing roleId"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new RegisterUserDto(name, username, email, password, roleId)];
  }
}
