import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getStudentList = (params) => {
  let url = `/api/student?`;

  const valueArr = ['beginDate', 'endDate', 'cityId', 'schoolId', 'pageSize', 'pageIndex'];

  url = buildUrl({ url, valueArr, value: params });

  return request(url);
};

// 删除
export const deleteStudentInfo = (params) => {
  return request(`/api/student/${params.studentId}`, {
    method: "DELETE"
  })
};
