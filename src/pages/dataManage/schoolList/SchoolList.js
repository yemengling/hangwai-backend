import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import { onChangePage, onChangePageSize } from '@/utils/myUtils/commonUtils';
import StandardTable from '@/components/StandardTable';

// 权限名称
const listAuth = 'schoolList';
const opreAuth = {
  add: 'schoolList_add',
  update: 'schoolList_update',
  delete: 'schoolList_del',
};

// 字段名称
export const schoolListFieldName = {
  id: 'ID',
  city: '城区',
  school: '学校',
  operate: '操作',
};

// modelsname
const modelsName = 'schoolList';

const SchoolList = (props) => {
  const {
    schoolList: { pagination, data, isSearch },
    loading,
    dispatch,
    exGlobal: { menuData },
  } = props;

  // 获取操作的权限
  const areaArr = getAuthorityOpreateArea(menuData, listAuth);
  const authDetail = getAuthorityOpreatDetail(areaArr, opreAuth);

  // state
  // const [selectedRows, setSelectedRows] = useState([]);

  // columns
  const columns = [
    {
      title: schoolListFieldName['id'],
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: schoolListFieldName['city'],
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: schoolListFieldName['school'],
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: schoolListFieldName['operate'],
      dataIndex: 'operate',
      key: 'operate',
      render: (rec) => (
        <>
          {authDetail.update === true && <a onClick={() => handleUpdate(rec)}>编辑</a>}
          {authDetail.delete === true && (
            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(rec)}>
              <a>删除</a>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  // 编辑
  const handleUpdate = (data) => {};

  // 删除
  const handelDelete = (data) => {};

  // 分页页码
  const onChang = (pageNumber) => {
    const paginationMethodStr = `${modelsName}/savePagination`;
    onChangePage({
      isSearch,
      pageNumber,
      pagination,
      paginationMethodStr,
      dispatch,
      method: getCurrentList,
    });
  };

  // 分页条数
  const onShowSizeChange = (current, pageSize) => {
    onChangePageSize({
      isSearch,
      current,
      pageSize,
      pagination,
      paginationMethodStr: `${modelsName}/savePagination`,
      dispatch,
      method: getCurrentList,
    });
  };

  // 获取数据, 收到的数据, 写到listData中，就是modal中的fetch函数
  const getCurrentList = (params) => {
    dispatch({
      type: `${modelsName}/getSchoolList`,
      payload: {
        ...params,
      },
    }).then((res) => {
      console.log('res___', res);
    });
  };

  // didMount
  useEffect(() => {
    dispatch({
      type: `${modelsName}/clearAll`,
    });

    getCurrentList({
      pageIndex: 1,
      pageSize: pagination.currentPageSize,
      totalCount: pagination.currentPageSize,
    });

    dispatch({
      type: `${modelsName}/savePagination`,
      payload: {
        ...pagination,
        current: 1,
      },
    });
  }, []);

  return (
    <React.Fragment>
      <StandardTable
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data && data.data}
        showSizeChanger={pagination.showSizeChanger}
        defaultCurrent={pagination.currentPageIndex}
        defaultPageSize={pagination.currentPageSize}
        current={pagination.current}
        total={data && data.totalCount}
        onChange={onChang}
        onShowSizeChange={onShowSizeChange}
      />
    </React.Fragment>
  );
};

export default connect(({ schoolList, loading, exGlobal }) => ({
  schoolList,
  loading: loading.models.schoolList,
  exGlobal,
}))(SchoolList);
