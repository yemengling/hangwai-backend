import { codeResult } from '@/utils/myUtils/commonUtils';
import { getPieData, getBarData, getTimelineData } from '@/services/dataManage/showChartApi';

export default {
    namespace: 'showChart',

    state: {},

    effects: {
        // 获取饼状图,
        * getPieData({ payload }, { call, put }) {
            // const response = yield call(getSchoolList, payload);

            const response = {
                code: 0,
                data: [
                    {
                        type: "录取（男）",
                        value: 50
                    },
                    {
                        type: "录取（女）",
                        value: 50
                    },
                    {
                        type: "未录取（男）",
                        value: 50
                    },
                    {
                        type: "未录取（女）",
                        value: 50
                    }
                ],
            };

            return response;
        },

        // 获取柱状图
        * getBarData({ payload }, { call, put }) {
            // const response = yield call(getBarData, payload);

            const response = {
                code: 0,
                data: [
                    {
                        city: '城区1', people: 18
                    },
                    {
                        city: '城区2', people: 28
                    },
                    {
                        city: '城区3', people: 38
                    },
                ],
            };

            return response
        },

        // 获取折线图
        * getTimelineData({ payload }, { call, put }) {
            // const response = yield call(getTimelineData, payload);

            const response = {
                code: 0,
                data: [
                    {
                        school: '学校1', people: 18
                    },
                    {
                        school: '学校2', people: 28
                    },
                    {
                        school: '学校3', people: 38
                    },
                ],
            };

            return response
        },
    },
}