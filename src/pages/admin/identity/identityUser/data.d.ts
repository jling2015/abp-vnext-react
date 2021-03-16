import type {
  ExtensibleFullAuditedEntityDto,
  PagedAndSortedResultRequestDto,
} from '@potatoabp/types';

export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto<string> {
  tenantId: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: Date;
  concurrencyStamp: string;
}
export interface CreateUserDto {
  userName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  lockoutEnabled: boolean;
  name: string;
  roleNames: string[];
  password: string;
}
export interface UpdateUserDto {
  userName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  lockoutEnabled: boolean;
  name: string;
  roleNames: string[];
  password: string;
  concurrencyStamp: string;
}
export interface GetUsersInput extends PagedAndSortedResultRequestDto {
  filter: string;
}
