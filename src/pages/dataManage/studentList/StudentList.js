import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import {
  codeResult,
  notifications,
  searchContent,
  resetContent,
  updateCurrentPage,
  onChangePage,
  onChangePageSize
} from '@/utils/myUtils/commonUtils';
import StandardTable from "@/components/StandardTable";
import StudentListSearchForm from "@/pages/dataManage/studentList/sub/StudentListSearchForm";
import { history, Link } from 'umi';

// 权限名称
const listAuth = 'studentList';
const opreAuth = {
  add: 'studentList_add',
  update: 'studentList_update',
  delete: 'studentList_delete'
};

// 字段名称
export const studentListFieldName = {
  studentId: 'ID',
  name: '姓名',
  sex: '性别',
  date: '年月',
  city: '城区',
  school: '学校',
  score: '总成绩',
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
    exGlobal: { menuData, cityList, schoolList }
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
      title: studentListFieldName['studentId'],
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: studentListFieldName['name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: studentListFieldName['sex'],
      dataIndex: 'sex',
      key: 'sex',
      render: (data, record) => (
        <>
          {record.sex == 1 ? '男' : '女'}
        </>
      )
    },
    {
      title: studentListFieldName['date'],
      dataIndex: 'date',
      key: 'date',
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
      title: studentListFieldName['score'],
      dataIndex: 'score',
      key: 'score',
      render: (data, record) => (
        <>
          {record.score}
          <Divider type="vertical" />
          {<Link to={`/dataManage/scoreDetail?id=${record.studentId}`}>查看详情</Link>}
        </>
      )
    },
    {
      title: studentListFieldName['isAdmit'],
      dataIndex: 'isAdmit',
      key: 'isAdmit',
      render: (data, record) => (
        <>
          {record.isAdmit ? '是' : '否'}
        </>
      )
    },
    {
      title: studentListFieldName['operate'],
      dataIndex: 'operate',
      key: 'operate',
      fixed: 'right',
      width: 200,
      render: (data, record) => (
        <>
          {authDetail.update === true && <Link to={`/dataManage/updateStudent?id=${record.studentId}`}>编辑</Link>}
          {authDetail.update === true && authDetail.delete === true && <Divider type="vertical" />}
          {authDetail.delete === true && (
            <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.studentId)}>
              <a>删除</a>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];


  // 新增
  const handleAdd = () => {
    history.push('/dataManage/addStudent');
  }

  // 删除
  const handleDelete = (studentId) => {
    const { dispatch } = props;
    const submitData = {
      studentId
    }

    dispatch({
      type: `${modelsName}/deleteStudentInfo`,
      payload: submitData
    }).then((res) => {
      if (codeResult(res)) {
        // 成功
        notifications('success', '操作成功', '');

        if (data.data.length == 1) {
          pagination.current = (pagination.current - 1) == 1 ? 1 : (pagination.current - 1);
        }

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

    // 获取城区列表
    dispatch({
      type: 'exGlobal/getCityList'
    });

    // 获取学校列表
    dispatch({
      type: 'exGlobal/getSchoolList'
    });
  }, []);

  return (
    <React.Fragment>
      <StudentListSearchForm
        cityList={cityList}
        schoolList={schoolList}
        handleSearch={handleSearch}
        handleFormReset={handleFormReset}
      />

      {
        authDetail.add === true &&
        <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增学生</Button>
      }

      <StandardTable
        scroll={{ x: 1600 }}
        rowKey="studentId"
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
