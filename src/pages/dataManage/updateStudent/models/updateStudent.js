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
            const response = yield call(getStudentInfo, payload);
            const studentInfo = response.r;
            const formVal = {
                isAdmit: studentInfo.isAdmit,
                sex: studentInfo.sex,
                name: studentInfo.name,
                date: moment(studentInfo.date, 'YY-MM'),
                cityId: studentInfo.cityId,
                schoolId: studentInfo.schoolId,
                papers: JSON.parse(studentInfo.papers)
            };

            if (codeResult(response)) {
                yield put({
                    type: 'save',
                    payload: formVal,
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