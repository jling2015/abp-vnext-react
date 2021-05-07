import React from 'react';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { AbpConfig } from '@potatoabp/types';

export const layout: RunTimeLayoutConfig = ({ abpConfigration }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // // 如果没有登录，重定向到 login
      // if (!abpConfigration?.currentUser.isAuthenticated && location.pathname !== '/user/login') {
      //   history.push('/user/login');
      // }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
  };
};

export const config: AbpConfig = {
  request: {
    apis: {
      default: {
        url: 'https://localhost:44370',
        rootNamespace: 'BookStore',
      },
    },
  },
};
