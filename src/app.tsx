import type { AbpConfig } from '@potatoabp/types';

export const config: AbpConfig = {
  request: {
    apis: {
      default: {
        url: 'https://localhost:44355',
        rootNamespace: 'BookStore',
      },
    },
  },
  oauthConfig: {
    scope: '',
    clientId: '',
  },
};
