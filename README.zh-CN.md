[English](./README.md) | 简体中文

<h1 align="center"> Abp Vnext React Template</h1>
<div align="center">
 一个开箱即用的 abp vnext  react 前端模板.
</div>

## 功能

- 📦 **Out of the Box**, 基于 Umi 和 Antd Pro，只需配置后端服务地址就可以开始了。同时还提供了一组 ABP 集成插件，实现了与 ABP 的无缝对接。

## 快速开始

```bash
# 安装cli
npm i @potatoabp/cli -g
```

然后

```bash
# 在一个空文件夹中执行
potato
```

选择应用程序

```bash
? Select the boilerplate type (Use arrow keys)
> application     - Create project with a abp vnext react front-end template
```

模板将自动安装

### 开发

安装依赖

```bash
$ npm install
```

首先更新 src/app.ts 中的服务地址

```javascript
// ... others
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
```

然后更新 src/services/login 中的 oauthconfig。ts(这是暂时的)

```javascript
// ... others
export async function fakeAccountLogin(params: LoginParamsType) {
  const urlencoded = new URLSearchParams();
  urlencoded.append('password', params.password);
  urlencoded.append('username', params.username);
  urlencoded.append('grant_type', 'password');
  urlencoded.append('client_id', 'BookStore_App');
  urlencoded.append('client_secret', '1q2w3e*');
  urlencoded.append('scope', 'BookStore');
  return request('/connect/token', {
    method: 'POST',
    data: urlencoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
```

然后

```bash
$ npm start
```

This will automatically open http://localhost:8000.

## Hooks

### 国际化

- useLocalization

```javascript
import { useLocalization } from 'umi';
const locale = useLocalization();
locale('AbpIdentity::Permissions');
```

- useResource

### 权限

```javascript
import { usePermission } from 'umi';
const isGranted = usePermission();
isGranted('abp.user.create');
```

- usePermission

### settings(TODO)

## 路由

内置的帐户和应用程序布局页面查看 config/routes.ts 了解更多

```javascript
export default [
  {
    name: 'account',
    // 设置layout
    layout: 'account', //or application
    path: '/account/login',
    component: './User/login',
  },
];
```

## 请求

### 配置

in the app.ts

```javascript
export const config: AbpConfig = {
  request: {
    apis: {
      default: {
        url: 'https://localhost:44355',
        rootNamespace: 'BookStore',
      },
    },
    TenantManagement: {
      url: 'https://localhost:44370',
      rootNamespace: 'TenantManagement',
    },
  },
};
```

### 使用

```javascript
import { request } from 'umi';

export async function outLogin() {
  return request('/api/login/outLogin', { apiName: 'TenantManagement' });
}
```

## TODO

- 模块管理系统
- 前端请求代理文件生成
- 其他内容...
