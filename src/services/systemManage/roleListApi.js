import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getRoleList = (params) => {
    let url = `/read?`;

    const valueArr = ['pageSize', 'pageIndex'];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 新增
export const addRoleInfo = (params) => {
    return request('/add', {
        method: "POST",
        data: params
    })
};

// 编辑
export const updateRoleInfo = (params) => {
    return request('/update', {
        method: "POST",
        data: params
    })
};

// 删除
export const deleteRoleInfo = (params) => {
    return request('/delete', {
        method: "POST",
        data: params
    })
};