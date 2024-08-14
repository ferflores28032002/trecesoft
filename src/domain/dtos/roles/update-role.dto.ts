export class UpdateRoleDto {
  constructor(
    public id: number,
    public name?: string,
    public description?: string,
    public is_active?: boolean
  ) {}

  static updateRole(object: Partial<UpdateRoleDto>): [string?, UpdateRoleDto?] {
    const { id, name, description, is_active } = object;

    if (id === undefined) return ["Missing id"];
    if (name === undefined) return ["Missing name"];
    if (description === undefined) return ["Description is not valid"];

    return [undefined, new UpdateRoleDto(id, name, description, is_active)];
  }
}
