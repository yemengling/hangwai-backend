import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取列表
export const getAccountList = (params) => {
    let url = `/api/base/user?`;

    const valueArr = ['pageSize', 'pageIndex'];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 新增
export const addAccountInfo = (params) => {
    return request('/api/base/user', {
        method: "POST",
        data: params
    })
};

// 编辑
export const updateAccountInfo = (params) => {
    return request('/api/base/user', {
        method: "PUT",
        data: params
    })
};

// 删除
export const deleteAccountInfo = (params) => {
    return request(`/api/base/user/${params.userId}`, {
        method: "DELETE"
    })
};