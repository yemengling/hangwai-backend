import { codeResult } from '@/utils/myUtils/commonUtils';
import { addStudentInfo } from '@/services/dataManage/addStudentApi';

export default {
    namespace: 'addStudent',

    state: {},

    effects: {
        // 新增学生
        * addStudentInfo({ payload }, { call, put }) {
            return yield call(addStudentInfo, payload);
        }
    }
}