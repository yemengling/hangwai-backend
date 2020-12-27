import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getScoreDetail = (params) => {
  return request(`/api/student/${params.id}`);
};
