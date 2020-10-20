import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getStudentList = (params) => {
  let url = `/?`;

  const valueArr = ['pageSize', 'pageIndex'];

  url = buildUrl({ url, valueArr, value: params });

  return request(url);
};
