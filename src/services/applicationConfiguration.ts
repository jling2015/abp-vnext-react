import { request } from 'umi';
import type { ApplicationConfiguration } from '@potatoabp/types';

export async function getApplicationConfiguration() {
  return request<ApplicationConfiguration>('/api/abp/application-configuration');
}
