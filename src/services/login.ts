import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

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

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
