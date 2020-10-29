import { codeResult } from '@/utils/myUtils/commonUtils';
import { getAccountList, addAccountInfo, updateAccountInfo, deleteAccountInfo } from '@/services/systemManage/accountListApi';

export default {
    namespace: 'accountList',

    state: {
        // 查询关键字
        isSearch: 0,

        // 列表数据
        data: {
            data: [],
            pageIndex: 0,
            pageSize: 0,
            totalCount: 0,
        },

        // 分页器数据
        pagination: {
            currentPageIndex: 1,
            currentPageSize: 10,
            current: 1,
            showSizeChanger: true,
        },
    },

    effects: {
        // 获取列表
        * getAccountList({ payload }, { call, put }) {
            // const response = yield call(getSchoolList, payload);

            const response = {
                code: 0,
                data: {
                    list: [
                        {
                            id: '1',
                            account: '账号1',
                            role: '角色1',
                        },
                    ],
                    total: 1,
                },
            };

            if (codeResult(response)) {
                yield put({
                    type: 'save',
                    payload: response.data,
                });
            }

            return response;
        },

        // 新增
        * addAccountInfo({ payload }, { call, put }) {
            const response = yield call(addAccountInfo, payload);
            return response
        },

        // 编辑
        * updateAccountInfo({ payload }, { call, put }) {
            return yield call(updateAccountInfo, payload);
        },

        // 删除
        * deleteAccountInfo({ payload }, { call, put }) {
            return yield call(deleteAccountInfo, payload);
        }
    },

    reducers: {
        // 保存listData
        save(state, action) {
            return {
                ...state,
                data: {
                    data: action.payload.list,
                    totalCount: action.payload.total,
                },
            };
        },

        // 保存分页器数据
        savePagination(state, action) {
            return {
                ...state,
                pagination: action.payload,
            };
        },

        // 清除
        clearAll() {
            return {
                // 查询关键字
                isSearch: 0,

                // 列表数据
                data: {
                    data: [],
                    pageIndex: 0,
                    pageSize: 0,
                    totalCount: 0,
                },

                // 分页器数据
                pagination: {
                    currentPageIndex: 1,
                    currentPageSize: 10,
                    current: 1,
                    showSizeChanger: true,
                },
            };
        },
    },
};
