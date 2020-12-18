import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getCityList = (params) => {
  let url = `/api/city?`;

  const valueArr = ['pageSize', 'pageIndex'];

  url = buildUrl({ url, valueArr, value: params });

  return request(url);
};

// 新增
export const addCityInfo = (params) => {
  return request('/api/city', {
    method: "POST",
    data: params
  })
};

// 编辑
export const updateCityInfo = (params) => {
  return request('/api/city', {
    method: "PUT",
    data: params
  })
};

// 删除
export const deleteCityInfo = (params) => {
  return request(`/api/city/${params.cityId}`, {
    method: "DELETE"
  })
};