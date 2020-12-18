import { codeResult } from '@/utils/myUtils/commonUtils';
import { getPieData, getBarData, getTimelineData } from '@/services/dataManage/showChartApi';

export default {
    namespace: 'showChart',

    state: {},

    effects: {
        // 获取饼状图,
        * getPieData({ payload }, { call, put }) {
            const response = yield call(getPieData, payload);

            return response;
        },

        // 获取柱状图
        * getBarData({ payload }, { call, put }) {
            const response = yield call(getBarData, payload);

            return response
        },

        // 获取折线图
        * getTimelineData({ payload }, { call, put }) {
            const response = yield call(getTimelineData, payload);
            
            return response
        },
    },
}