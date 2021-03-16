import { request } from 'umi';
import type { PagedResultDto } from '@potatoabp/types';
import type { CreateRoleDto, GetRolesInput, IdentityRoleDto, UpdateRoleDto } from './data.d';

export async function getRoles(params?: GetRolesInput) {
  return request<PagedResultDto<IdentityRoleDto>>('/api/identity/roles', {
    params,
  });
}

export async function createRole(data: CreateRoleDto) {
  return request('/api/identity/roles', {
    method: 'POST',
    data,
  });
}

export async function updateRole(id: string, data: UpdateRoleDto) {
  return request(`/api/identity/roles/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function deleteRole(id: string) {
  return request(`/api/identity/roles/${id}`, {
    method: 'DELETE',
  });
}
