import { codeResult } from '@/utils/myUtils/commonUtils';
import { getStudentList, deleteStudentInfo } from '@/services/dataManage/studentListApi';

export default {
  namespace: 'studentList',

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
    * getStudentList({ payload }, { call, put }) {
      const response = yield call(getStudentList, payload);

      if (codeResult(response)) {
        yield put({
          type: 'save',
          payload: response.r
        });
      }

      return response;
    },

    // 删除
    * deleteStudentInfo({ payload }, { call, put }) {
      return yield call(deleteStudentInfo, payload);
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

    // 保存查询数据
    saveIsSearch(state, action) {
      return {
        ...state,
        isSearch: action.payload,
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
