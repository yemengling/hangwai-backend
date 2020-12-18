import request from '@/utils/request';

// 新增
export const addStudentInfo = (params) => {
    return request('/api/student', {
        method: "POST",
        data: params
    })
};