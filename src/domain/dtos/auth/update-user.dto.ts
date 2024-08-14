export class UpdateUserDto {
  private constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public newPassword: string,
    public roleId: number
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email, password, username, roleId, id, newPassword } = object;

    if (!id) return ["Missing id"];

    return [
      undefined,
      new UpdateUserDto(
        id,
        name,
        username,
        email,
        password,
        newPassword,
        roleId
      ),
    ];
  }
}
