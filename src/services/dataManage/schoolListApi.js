import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getSchoolList = (params) => {
  let url = `/read?`;

  const valueArr = ['pageSize', 'pageIndex'];

  url = buildUrl({ url, valueArr, value: params });

  return request(url);
};

// 新增
export const addSchoolInfo = (params) => {
  return request('/add', {
    method: "POST",
    body: params
  })
};

// 编辑
export const updateSchoolInfo = (params) => {
  return request('/update', {
    method: "POST",
    body: params
  })
};

// 删除
export const deleteSchoolInfo = (params) => {
  return request('/delete', {
    method: "POST",
    body: params
  })
};