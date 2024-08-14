export class RolEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public is_active: boolean
  ) {}
}
