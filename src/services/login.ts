import request from '@/utils/request';

export interface LoginParamsType {
  account: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return request('/api/base/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function loginOut(token: string) {
  return request(`/api/base/user/logout?token=${token}`);
}