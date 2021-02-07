import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取饼状图
export const getPieData = (params) => {
    let url = `/api/bi/groupAdmit`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取柱状图
export const getBarData = (params) => {
    let url = `/api/bi/groupCity`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取折线图
export const getTimelineData1 = (params) => {
    let url = `/api/bi/groupSchool`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

export const getTimelineData2 = (params) => {
    let url = `/api/bi/groupSchool`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

export const getTimelineData3 = (params) => {
    let url = `/api/bi/groupSchool`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};
