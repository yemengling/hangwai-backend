import request from '@/utils/request';

// 获取菜单
export const getMenuData = (params) => {
    let url = `/read?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取城区列表
export const getCityList = (params) => {
    let url = `/read?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取学校列表
export const getSchoolList = (params) => {
    let url = `/read?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取角色列表
export const getRoleList = (params) => {
    let url = `/read?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};