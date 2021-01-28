import { request } from 'umi';
import { ApplicationConfiguration} from '@potatoabp/types';

export async function getApplicationConfiguration() {
  return request<ApplicationConfiguration>('/api/abp/application-configuration');
}
