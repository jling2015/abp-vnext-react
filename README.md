<h1 align="center">Welcome to Abp Vnext React Template 👋</h1>


## Features

- 📦 **Out of the Box**, Based on Umi and Antd Pro，Just configure the back-end service address to get started。It also provides a set of integrated plug-ins for ABP,Realize the seamless docking with ABP。

## Getting Started

```bash
# install the cli
npm i @potatoabp/cli -g
```
then
```bash
# execute in an empty folder
potato
```
choose application
```bash
? Select the boilerplate type (Use arrow keys)
> application     - Create project with a abp vnext react front-end template
```
template will be installed automatically

### Development

Install Dependencies
```bash
$ npm install
```
first update the service address in src/app.ts
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
first update the oauthconfig  in src/services/login.ts(this is temporary)
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
then
```bash
$ npm install
```
This will automatically open http://localhost:8000.
