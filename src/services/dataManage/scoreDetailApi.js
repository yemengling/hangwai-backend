import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getScoreDetail = (params) => {
  return request(`/api/student/${params.id}`);
};

// 获取折线图
export const getTimelineData = (params) => {
  let url = `/api/bi/groupSchool`;

  const valueArr = [];

  url = buildUrl({ url, valueArr, value: params });

  return request(url);
};
