import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取学生信息
export const getStudentInfo = (params) => {
    return request(`/api/student/${params.id}`);
};

// 编辑
export const updateStudentInfo = (params) => {
    return request('/api/student', {
        method: "PUT",
        data: params
    })
};