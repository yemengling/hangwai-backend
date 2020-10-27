import request from '@/utils/request';

// 新增
export const addStudentInfo = (params) => {
    return request('/add', {
        method: "POST",
        data: params
    })
};