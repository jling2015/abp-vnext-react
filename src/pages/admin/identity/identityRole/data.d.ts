
export interface IdentityRoleDto{
  id:string;
  name:string;
  isDefault:boolean;
  isPublic:boolean;
  concurrencyStamp:string;
  extraProperties:{}
}
export interface CreateRoleDto {
  name:string;
  isDefault:boolean;
  isPublic:boolean;
}
export interface UpdateRoleDto {
  name:string;
  isDefault:boolean;
  isPublic:boolean;
  concurrencyStamp:string;
}
