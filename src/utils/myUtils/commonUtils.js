import { notification } from 'antd';

// 判断code为成功
export const codeResult = (res) => {
  try {
    return res.code === 0;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 查询
 *
 * @param value 搜索的内容
 * @param pagination    分页器
 * @param saveIsSearchStr   modol存isSearch的方法
 * @param savePaginationStr modol存分页器的方法
 * @param dispatch
 * @param method    getCurrentList的方法
 */
export const searchContent = ({
  value,
  pagination,
  saveIsSearchStr,
  savePaginationStr,
  dispatch,
  method,
}) => {
  // 设置当前页为1，设置大小为false
  dispatch({
    type: savePaginationStr,
    payload: {
      ...pagination,
      current: 1,
      showSizeChanger: false,
    },
  });

  // 判断是否存关键字, 否则传用户名
  function isValueTrue() {
    for (let item in value) {
      if (value[item] !== undefined && value[item] !== '') {
        return true;
      }
    }

    return false;
  }

  let isSearch = isValueTrue();
  let methodPranms = {};
  let dispatchIsSearchPranms = {};

  if (isSearch) {
    methodPranms = {
      pageIndex: 1,
      pageSize: pagination.currentPageSize,
      ...value,
    };

    dispatchIsSearchPranms = {
      type: saveIsSearchStr,
      payload: {
        ...value,
      },
    };
  } else {
    methodPranms = {
      pageIndex: pagination.currentPageIndex,
      pageSize: pagination.currentPageSize,
    };

    dispatchIsSearchPranms = {
      type: saveIsSearchStr,
      payload: 0,
    };

    // 把当前页设为以前的页面
    dispatch({
      type: savePaginationStr,
      payload: {
        ...pagination,
        current: pagination.currentPageIndex,
        showSizeChanger: true,
      },
    });
  }

  method(methodPranms);
  dispatch(dispatchIsSearchPranms);
};

/**
 * 重置——若没有form.resetFields()，则没重置
 *
 * @param pagination  分页器
 * @param saveIsSearchStr     存查询的方法
 * @param savePaginationStr   存分页器的方法
 * @param dispatch
 * @param method              getCurrentList的方法
 */
export const resetContent = ({
  pagination,
  saveIsSearchStr,
  savePaginationStr,
  dispatch,
  method,
}) => {
  method({
    pageIndex: pagination.currentPageIndex,
    pageSize: pagination.currentPageSize,
  });

  // 存关键字为空，即存false
  dispatch({
    type: saveIsSearchStr,
    payload: 0,
  });

  // 把当前页设为以前的页面并显示pageSize
  dispatch({
    type: savePaginationStr,
    payload: {
      ...pagination,
      current: pagination.currentPageIndex,
      showSizeChanger: true,
    },
  });
};

/**
 * 分页器页码设置
 *
 * @param isSearch  在model中查询
 * @param pageNumber
 * @param pagination    在modol中分页器
 * @param paginationMethodStr   在modol中存分页器type的字符串
 * @param dispatch
 * @param method    getCurrentList方法
 */
export const onChangePage = ({
  isSearch,
  pageNumber,
  pagination,
  paginationMethodStr,
  dispatch,
  method,
}) => {
  let params = {
    pageIndex: pageNumber,
    pageSize: pagination.currentPageSize,
    totalCount: pagination.currentPageSize,
  };

  let dispatchParams = {
    type: paginationMethodStr,
    payload: {
      ...pagination,
      current: pageNumber,
    },
  };

  if (isSearch) {
    console.log('在查询状态:');
    params = {
      ...params,
      ...isSearch,
    };
  }

  if (!isSearch) {
    dispatchParams = Object.assign({}, dispatchParams, {
      currentPageIndex: pageNumber,
    });
  }

  method(params);
  dispatch(dispatchParams);
};

/**
 * 分页器每页条数设置
 *
 * @param isSearch  model中查询
 * @param current   当前页码
 * @param pageSize  每页条数
 * @param pagination    在modol中分页器
 * @param paginationMethodStr   在modol中存分页器type的字符串
 * @param dispatch
 * @param method    getCurrentList方法
 */
export const onChangePageSize = ({
  isSearch,
  current,
  pageSize,
  pagination,
  paginationMethodStr,
  dispatch,
  method,
}) => {
  let params = { pageIndex: current, pageSize: pageSize, totalCount: pagination.currentPageSize };

  if (isSearch) {
    console.log('在查询状态:');
    params = {
      pageIndex: current,
      pageSize: pageSize,
      ...isSearch,
    };
  } else {
    console.log('不在查询状态');
    // 存大小
    dispatch({
      type: paginationMethodStr,
      payload: {
        ...pagination,
        currentPageSize: pageSize,
      },
    });
  }

  method(params);
};

/**
 * 刷新当前页
 *
 * @param isSearch  model中查询
 * @param pagination  在modol中分页器
 * @param method  getCurrentList方法
 */
export const updateCurrentPage = ({ isSearch, pagination, method }) => {
  method({
    ...isSearch,
    pageIndex: pagination.current,
    pageSize: pagination.currentPageSize,
    totalCount: pagination.currentPageSize
  });
};

/**
 * 通知消息
 * 
 * @param type  success，info，warning，error
 * @param title
 * @param msg
 */
export const notifications = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg
  });
};