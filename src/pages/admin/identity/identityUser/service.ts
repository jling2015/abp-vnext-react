import { request } from 'umi';
import type { PagedResultDto } from '@potatoabp/types';
import type { CreateUserDto, IdentityUserDto, UpdateUserDto } from './data.d';

export async function getUsers() {
  return request<PagedResultDto<IdentityUserDto>>('/api/identity/users');
}

export async function createUser(data: CreateUserDto) {
  return request('/api/identity/users', {
    method: 'POST',
    data,
  });
}
export async function updateUser(id: string, data: UpdateUserDto) {
  return request(`/api/identity/users/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function deleteUser(id: string) {
  return request(`/api/identity/users/${id}`, {
    method: 'DELETE',
  });
}
