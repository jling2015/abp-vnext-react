import { request } from 'umi';
import { PagedResultDto } from '@potatoabp/types';
import { IdentityUserDto } from './data.d';

export async function getUsers() {
  return request<PagedResultDto<IdentityUserDto>>('/api/identity/users');
}
