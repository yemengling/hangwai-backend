import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import {
  searchContent,
  resetContent,
  onChangePage,
  onChangePageSize,
} from '@/utils/myUtils/commonUtils';
import StandardTable from '@/components/StandardTable';

// 权限名称
const listAuth = 'studentList';
const opreAuth = {
  add: 'studentList',
  update: 'studentList_update',
  delete: 'studentList_del',
};

// 字段名称
export const studentListFieldName = {
  id: 'ID',
  year: '年份',
  name: '姓名',
  city: '城区',
  school: '学校',
  scroe: '成绩',
  isAdmit: '录取',
  operate: '操作',
};

// modelsname
const modelsName = 'studentList';

const StudentList = (props) => {
  const {
    studentList: { pagination, data, isSearch },
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
      title: studentListFieldName['id'],
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: studentListFieldName['year'],
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: studentListFieldName['name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: studentListFieldName['city'],
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: studentListFieldName['school'],
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: studentListFieldName['scroe'],
      dataIndex: 'scroe',
      key: 'scroe',
    },
    {
      title: studentListFieldName['isAdmit'],
      dataIndex: 'isAdmit',
      key: 'isAdmit',
    },
    {
      title: studentListFieldName['operate'],
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

  // 查询
  const handleSearch = (value) => {
    const savePaginationStr = `${modelsName}/savePagination`;
    const saveIsSearchStr = `${modelsName}/saveIsSearch`;

    searchContent({
      value,
      pagination,
      saveIsSearchStr,
      savePaginationStr,
      dispatch,
      method: getCurrentList,
    });
  };

  // 重置
  const handleFormReset = () => {
    const savePaginationStr = `${modelsName}/savePagination`;
    const saveIsSearchStr = `${modelsName}/saveIsSearch`;

    resetContent({
      pagination,
      saveIsSearchStr,
      savePaginationStr,
      dispatch,
      method: getCurrentList,
    });
  };

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
      type: `${modelsName}/getStudentList`,
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

export default connect(({ studentList, loading, exGlobal }) => ({
  studentList,
  loading: loading.models.studentList,
  exGlobal,
}))(StudentList);
