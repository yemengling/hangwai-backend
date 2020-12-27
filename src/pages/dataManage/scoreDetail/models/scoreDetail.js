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
    * getScoreDetail({ payload }, { call, put }) {
      const response = yield call(getScoreDetail, payload);
      const asPapers = JSON.parse(response.r.papers);
      const studentInfo = {
        list: [],
        total: 1
      };

      for(let i = 0; i < asPapers.length; i++){
        const oPapers = {
          id: i + 1,
          paper: asPapers[i].paper,
          part1: asPapers[i].part1,
          part2: asPapers[i].part2,
          part3: asPapers[i].part3,
          part4: asPapers[i].part4
        };

        studentInfo.list.push(oPapers);
      }

      if (codeResult(response)) {
        yield put({
          type: 'save',
          payload: studentInfo,
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
