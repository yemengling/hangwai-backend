import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(account: string): Promise<any> {
  // return request('/api/currentUser');
  return request(`/api/base/user/getProfile?account=${account}`); 
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
