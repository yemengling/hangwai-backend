import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取学生信息
export const getStudentInfo = (params) => {
    let url = `/api/student?`;

    const valueArr = ['id'];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 编辑
export const updateStudentInfo = (params) => {
    return request('/api/student', {
        method: "PUT",
        data: params
    })
};