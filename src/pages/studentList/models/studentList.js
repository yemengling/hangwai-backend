import { codeResult } from '@/utils/myUtils/commonUtils';
import { getStudentList } from '@/services/dataManage/studentListApi';

export default {
  namespace: 'studentList',
  state: {
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

    // 查询关键字
    isSearch: 0,
  },

  effects: {
    // 获取列表
    *getStudentList({ payload }, { call, put }) {
      // const response = yield call(getStudentList, payload);

      const response = {
        code: 0,
        data: {
          list: [
            {
              id: '1',
              year: '2001',
              name: '姓名1',
              city: '城区1',
              school: '学校1',
              scroe: '100',
              isAdmit: '是',
            },
            {
              id: '2',
              year: '2002',
              name: '姓名2',
              city: '城区2',
              school: '学校2',
              scroe: '102',
              isAdmit: '否',
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

        // 查询关键字
        isSearch: 0,
      };
    },
  },
};
