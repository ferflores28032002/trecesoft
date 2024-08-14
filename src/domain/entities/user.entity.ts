export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public is_active: boolean = true,
    public roleId: number
  ) {}
}
