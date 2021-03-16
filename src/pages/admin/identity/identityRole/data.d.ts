import type { Dictionary, PagedAndSortedResultRequestDto } from '@potatoabp/types';

export interface IdentityRoleDto {
  id: string;
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
  extraProperties: Dictionary;
}
export interface CreateRoleDto {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}
export interface GetRolesInput extends PagedAndSortedResultRequestDto {
  filter: string;
}
export interface UpdateRoleDto {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}
