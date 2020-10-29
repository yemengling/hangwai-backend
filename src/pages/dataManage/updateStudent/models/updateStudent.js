import { codeResult } from '@/utils/myUtils/commonUtils';
import { getStudentInfo, updateStudentInfo } from '@/services/dataManage/updateStudentApi';
import moment from 'moment';

export default {
    namespace: 'updateStudent',

    state: {
        data: {
            data: {},
        }
    },

    effects: {
        // 获取列表
        * getStudentInfo({ payload }, { call, put }) {
            let response = {
                code: 0,
                data: {
                    isAdmit: 1,
                    sex: 1,
                    name: '姓名1',
                    date: '2020-02',
                    city: '城区1',
                    school: '学校1',
                    papers: [
                        {
                            'name': '试卷1',
                            'first': '10',
                            'second': '20',
                            'third': '30',
                            'fourth': '40'
                        }
                    ]
                }
            };

            response.data.date = moment('2020-02', 'YY-MM');

            if (codeResult(response)) {
                yield put({
                    type: 'save',
                    payload: response.data,
                });
            }

            return response;
        },

        // 编辑
        * updateStudentInfo({ payload }, { call, put }) {
            return yield call(updateStudentInfo, payload);
        },
    },

    reducers: {
        // 保存infoData
        save(state, action) {
            return {
                ...state,
                data: {
                    data: action.payload
                },
            };
        },
    }
}