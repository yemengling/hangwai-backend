import { codeResult } from '@/utils/myUtils/commonUtils';
import { getScoreDetail } from '@/services/dataManage/scoreDetailApi';

export default {
  namespace: 'scoreDetail',

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
    *getScoreDetail({ payload }, { call, put }) {
      // const response = yield call(getSchoolList, payload);

      const response = {
        code: 0,
        data: {
          list: [
            {
              paper: '试卷1',
              part1: '10',
              part2: '20',
              part3: '30',
              part4: '40',
            },
            {
              paper: '试卷2',
              part1: '15',
              part2: '25',
              part3: '35',
              part4: '45',
            },
          ],
          total: 2,
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
