import { request } from 'umi';
import { PagedResultDto } from '@potatoabp/types';
import { CreateRoleDto, IdentityRoleDto, UpdateRoleDto } from './data.d';

export async function getRoles() {
  return request<PagedResultDto<IdentityRoleDto>>('/api/identity/roles');
}
export async function createRole(data:CreateRoleDto) {
  return request('/api/identity/roles',{
    method:'POST',
    data,
  });
}
export async function updateRole(id:string,data:UpdateRoleDto) {
  return request(`/api/identity/roles/${id}`,{
    method:'PUT',
    data,
  });
}
export async function deleteRole(id:string) {
  return request(`/api/identity/roles/${id}`,{
    method:'DELETE',
  });
}

