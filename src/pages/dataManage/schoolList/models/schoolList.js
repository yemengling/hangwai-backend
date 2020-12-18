import { codeResult } from '@/utils/myUtils/commonUtils';
import { getSchoolList, addSchoolInfo, updateSchoolInfo, deleteSchoolInfo } from '@/services/dataManage/schoolListApi';

export default {
  namespace: 'schoolList',

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
    * getSchoolList({ payload }, { call, put }) {
      const response = yield call(getSchoolList, payload);

      if (codeResult(response)) {
        yield put({
          type: 'save',
          payload: response.r
        });
      }

      return response;
    },

    // 新增
    * addSchoolInfo({ payload }, { call, put }) {
      return yield call(addSchoolInfo, payload);
    },

    // 编辑
    * updateSchoolInfo({ payload }, { call, put }) {
      return yield call(updateSchoolInfo, payload);
    },

    // 删除
    * deleteSchoolInfo({ payload }, { call, put }) {
      return yield call(deleteSchoolInfo, payload);
    }
  },

  reducers: {
    // 保存listData
    save(state, action) {
      return {
        ...state,
        data: {
          data: action.payload.list,
          totalCount: action.payload.count.recordCount,
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
