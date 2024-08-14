
export class CreateRoleDto {
  private constructor(public name: string, public description: string) {}

  static createRole(object: { [key: string]: any }): [string?, CreateRoleDto?] {
    const { name, description } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["description is not valid"];
   

    return [undefined, new CreateRoleDto(name, description)];
  }
}
