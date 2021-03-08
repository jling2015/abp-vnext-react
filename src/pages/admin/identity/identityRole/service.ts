import { request } from 'umi';
import { PagedResultDto } from '@potatoabp/types';
import { IdentityRoleDto } from './data.d';

export async function getRoles() {
  return request<PagedResultDto<IdentityRoleDto>>('/api/identity/roles');
}
