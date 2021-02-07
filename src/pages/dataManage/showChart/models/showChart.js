import { codeResult } from '@/utils/myUtils/commonUtils';
import { getPieData, getBarData, getTimelineData1, getTimelineData2, getTimelineData3 } from '@/services/dataManage/showChartApi';

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
        * getTimelineData1({ payload }, { call, put }) {
            const response = yield call(getTimelineData1, payload);
            
            return response
        },

        * getTimelineData2({ payload }, { call, put }) {
            const response = yield call(getTimelineData2, payload);
            
            return response
        },

        * getTimelineData3({ payload }, { call, put }) {
            const response = yield call(getTimelineData3, payload);
            
            return response
        },
    },
}