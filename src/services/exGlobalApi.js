import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取菜单
export const getMenuData = (params) => {
    let url = `/api/base/user/getPermissionList`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取权限
export const getPermissionList = (params) => {
    let url = `/api/base/user/permission/permissionList`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取城区列表
export const getCityList = (params) => {
    let url = `/api/city/all`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取学校列表
export const getSchoolList = (params) => {
    let url = `/api/school/all?`;

    const valueArr = ['cityId'];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取角色列表
export const getRoleList = (params) => {
    let url = `/api/base/user/role/all`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};