import { buildUrl } from '@/utils/myUtils/stringUtils.js';
import request from '@/utils/request';

// 获取饼状图
export const getPieData = (params) => {
    let url = `/readPie?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};

// 获取柱状图
export const getBarData = (params) => {
    let url = `/readBar?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};


// 获取折线图
export const getTimelineData = (params) => {
    let url = `/readTimeline?`;

    const valueArr = [];

    url = buildUrl({ url, valueArr, value: params });

    return request(url);
};
