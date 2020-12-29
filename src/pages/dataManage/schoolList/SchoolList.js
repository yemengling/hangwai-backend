import React, { useEffect, useState } from 'react';
import { Form, Button, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import {
  codeResult,
  notifications,
  updateCurrentPage,
  onChangePage,
  onChangePageSize
} from '@/utils/myUtils/commonUtils';
import StandardTable from '@/components/StandardTable';
import AddSchoolListView from "@/pages/dataManage/schoolList/sub/AddSchoolListView";
import UpdateSchoolListView from "@/pages/dataManage/schoolList/sub/UpdateSchoolListView";

// 权限名称
const listAuth = 'schoolList';
const opreAuth = {
  add: 'schoolList_add',
  update: 'schoolList_update',
  delete: 'schoolList_delete'
};

// 字段名称
export const schoolListFieldName = {
  schoolId: 'ID',
  city: '城区',
  name: '学校',
  operate: '操作'
};

// modelsname
const modelsName = 'schoolList';

const SchoolList = (props) => {
  const {
    schoolList: { isSearch, pagination, data },
    loading,
    dispatch,
    exGlobal: { menuData, cityList }
  } = props;
  const [form] = Form.useForm();

  // 获取操作的权限
  const areaArr = getAuthorityOpreateArea(menuData, listAuth);
  const authDetail = getAuthorityOpreatDetail(areaArr, opreAuth);

  // state
  // const [selectedRows, setSelectedRows] = useState([]);
  const [addVisable, setAddVisable] = useState(false);
  const [updateVisable, setUpdateVisable] = useState(false);
  const [recordData, setRecordData] = useState({});

  // columns
  const columns = [
    {
      title: schoolListFieldName['schoolId'],
      dataIndex: 'schoolId',
      key: 'schoolId',
    },
    {
      title: schoolListFieldName['city'],
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: schoolListFieldName['name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: schoolListFieldName['operate'],
      key: 'operate',
      fixed: 'right',
      width: 200,
      render: (data, record) => (
        <>
          {authDetail.update === true && <a onClick={() => handleUpdate(data)}>编辑</a>}
          {authDetail.update === true && authDetail.delete === true && <Divider type="vertical" />}
          {authDetail.delete === true && (
            <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.schoolId)}>
              <a>删除</a>
            </Popconfirm>
          )}
        </>
      )
    },
  ];


  // 新增
  const handleAdd = () => {
    setAddVisable(true);

    form.resetFields();
  };
  const addSubmit = (value) => {
    const { dispatch } = props;
    const submitData = value;

    dispatch({
      type: `${modelsName}/addSchoolInfo`,
      payload: submitData
    }).then((res) => {
      if (codeResult(res)) {
        // 成功
        updateCurrentPage({
          isSearch,
          pagination,
          method: getCurrentList
        });
        onCancels();
        notifications('success', '操作成功', '');
      } else {
        // 失败
        // notifications('error', '系统提示', res.d);
      }
    });
  };

  // 编辑
  const handleUpdate = (data) => {
    setRecordData(data);
    setUpdateVisable(true);

    form.resetFields();
    form.setFieldsValue({
      cityId: data.cityId,
      name: data.name
    });
  };
  const updateSubmit = (data) => {
    const { dispatch } = props;
    const submitData = data;

    submitData.schoolId = recordData.schoolId;

    dispatch({
      type: `${modelsName}/updateSchoolInfo`,
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
        onCancels();
      } else {
        // 失败
        // notifications('error', '系统提示', res.d);
      }
    });
  };

  // 删除
  const handleDelete = (schoolId) => {
    const { dispatch } = props;
    const submitData = {
      schoolId
    }

    dispatch({
      type: `${modelsName}/deleteSchoolInfo`,
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
        onCancels();
      } else {
        // 失败
        // notifications('error', '系统提示', res.d);
      }
    });
  };

  // 弹窗-取消
  const onCancels = () => {
    setAddVisable(false);
    setUpdateVisable(false);
    setRecordData({});
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
      type: `${modelsName}/getSchoolList`,
      payload: {
        ...params
      },
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
      },
    });

    // 获取城区列表
    dispatch({
      type: 'exGlobal/getCityList'
    });
  }, []);

  return (
    <React.Fragment>
      {
        authDetail.add === true &&
        <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增学校</Button>
      }

      <StandardTable
        scroll={{ x: 600 }}
        rowKey="schoolId"
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

      <AddSchoolListView
        form={form}
        modalVisible={addVisable}
        title="新增"
        cityList={cityList}
        okHandle={addSubmit}
        onCancel={onCancels}
      />

      <UpdateSchoolListView
        form={form}
        modalVisible={updateVisable}
        title="编辑"
        cityList={cityList}
        recordData={recordData}
        okHandle={updateSubmit}
        onCancel={onCancels}
      />
    </React.Fragment>
  );
};

export default connect(({ schoolList, loading, exGlobal }) => ({
  schoolList,
  loading: loading.models.schoolList,
  exGlobal
}))(SchoolList);
