import { codeResult } from '@/utils/myUtils/commonUtils';
import { getRoleList, addRoleInfo, updateRoleInfo, deleteRoleInfo } from '@/services/systemManage/roleListApi';

export default {
    namespace: 'roleList',

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
        * getRoleList({ payload }, { call, put }) {
            // const response = yield call(getSchoolList, payload);

            const response = {
                code: 0,
                data: {
                    list: [
                        {
                            id: '1',
                            name: '角色1',
                            isAdd: 1,
                            isUpdate: 1,
                            isDelete: 1,
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
        * addRoleInfo({ payload }, { call, put }) {
            const response = yield call(addRoleInfo, payload);
            return response
        },

        // 编辑
        * updateRoleInfo({ payload }, { call, put }) {
            return yield call(updateRoleInfo, payload);
        },

        // 删除
        * deleteRoleInfo({ payload }, { call, put }) {
            return yield call(deleteRoleInfo, payload);
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
