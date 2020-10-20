import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import {
  codeResult,
  notifications, 
  searchContent,
  resetContent,
  onChangePage,
  onChangePageSize
} from '@/utils/myUtils/commonUtils';
import StandardTable from "@/components/StandardTable";
import StudentListSearchForm from "@/pages/dataManage/studentList/sub/StudentListSearchForm";
import { Link } from 'umi';

// 权限名称
const listAuth = 'studentList';
const opreAuth = {
  look: 'studentList_look',
  add: 'studentList_add',
  update: 'studentList_update',
  delete: 'studentList_delete'
};

// 字段名称
export const studentListFieldName = {
  id: 'ID',
  year: '年份',
  name: '姓名',
  city: '城区',
  school: '学校',
  scroe: '总成绩',
  isAdmit: '录取',
  operate: '操作',
};

// modelsname
const modelsName = 'studentList';

const StudentList = (props) => {
  const {
    studentList: { isSearch, pagination, data },
    loading,
    dispatch,
    exGlobal: { menuData }
  } = props;

  // 获取操作的权限
  const areaArr = getAuthorityOpreateArea(menuData, listAuth);
  const authDetail = getAuthorityOpreatDetail(areaArr, opreAuth);

  // state
  // const [selectedRows, setSelectedRows] = useState([]);
  const [lookVisable, setLookVisable] = useState(false);
  const [recordData, setRecordData] = useState({});

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
      render: (data, record) => (
        <>
          {record.scroe}
          <Divider type="vertical" />
          {authDetail.look === true || <Link to={`/dataManage/scoreDetail?id=${record.id}`}>查看详情</Link>}
        </>
      )
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
      render: (data, record) => (
        <>
          {authDetail.update === true || <a onClick={() => handleUpdate(data)}>编辑</a>}
          {authDetail.update === true || authDetail.delete === true || <Divider type="vertical" />}
          {authDetail.delete === true || (
            <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.id)}>
              <a>删除</a>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];


  // 删除
  const handleDelete = (id) => { 
    const { dispatch } = props;
    const submitData = {
      id
    }

    dispatch({
      type: `${modelsName}/deleteStudentInfo`,
      payload: submitData
    }).then((res) => {
      if (codeResult(res)) {
        // 成功
        notifications('success', '操作成功', '');

        updateCurrentPage({ 
          isSearch, 
          pagination,   
          method: getCurrentList 
        });
      } else {
        // 失败
        notifications('error', '系统提示', res.message);
      }
    });
  };


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
      method: getCurrentList
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
      method: getCurrentList
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
      method: getCurrentList
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
      method: getCurrentList
    });
  };

  // 获取数据, 收到的数据, 写到listData中，就是modal中的fetch函数
  const getCurrentList = (params) => {
    dispatch({
      type: `${modelsName}/getStudentList`,
      payload: {
        ...params
      }
    }).then((res) => {
      console.log('res___', res);
    });
  };

  // didMount
  useEffect(() => {
    dispatch({
      type: `${modelsName}/clearAll`
    });

    getCurrentList({
      pageIndex: 1,
      pageSize: pagination.currentPageSize,
      totalCount: pagination.currentPageSize
    });

    dispatch({
      type: `${modelsName}/savePagination`,
      payload: {
        ...pagination,
        current: 1
      }
    });
  }, []);

  return (
    <React.Fragment>
      <StudentListSearchForm
        handleSearch={handleSearch}
        handleFormReset={handleFormReset}
      />

      {
        authDetail.add === true ||
        <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增学生</Button>
      }

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
  exGlobal
}))(StudentList);
