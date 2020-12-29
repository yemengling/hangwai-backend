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
import AddCityListView from "@/pages/dataManage/cityList/sub/AddCityListView";
import UpdateCityListView from "@/pages/dataManage/cityList/sub/UpdateCityListView";

// 权限名称
const listAuth = 'cityList';
const opreAuth = {
  add: 'cityList_add',
  update: 'cityList_update',
  delete: 'cityList_delete'
};

// 字段名称
export const cityListFieldName = {
  cityId: 'ID',
  name: '城区',
  operate: '操作'
};

// modelsname
const modelsName = 'cityList';

const CityList = (props) => {
  const {
    cityList: { isSearch, pagination, data },
    loading,
    dispatch,
    exGlobal: { menuData }
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
      title: cityListFieldName['cityId'],
      dataIndex: 'cityId',
      key: 'cityId',
    },
    {
      title: cityListFieldName['name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: cityListFieldName['operate'],
      key: 'operate',
      fixed: 'right',
      width: 200,
      render: (data, record) => (
        <>
          {authDetail.update === true && <a onClick={() => handleUpdate(data)}>编辑</a>}
          {authDetail.update === true && authDetail.delete === true && <Divider type="vertical" />}
          {authDetail.delete === true && (
            <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.cityId)}>
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
      type: `${modelsName}/addCityInfo`,
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
      name: data.name
    });
  };
  const updateSubmit = (data) => {
    const { dispatch } = props;
    const submitData = data;

    submitData.cityId = recordData.cityId;

    dispatch({
      type: `${modelsName}/updateCityInfo`,
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
  const handleDelete = (cityId) => {
    const { dispatch } = props;
    const submitData = {
      cityId
    }

    dispatch({
      type: `${modelsName}/deleteCityInfo`,
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
      type: `${modelsName}/getCityList`,
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
  }, []);

  return (
    <React.Fragment>
      {
        authDetail.add === true &&
        <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增城区</Button>
      }

      <StandardTable
        scroll={{ x: 400 }}
        rowKey="cityId"
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

      <AddCityListView
        form={form}
        modalVisible={addVisable}
        title="新增"
        okHandle={addSubmit}
        onCancel={onCancels}
      />

      <UpdateCityListView
        form={form}
        modalVisible={updateVisable}
        title="编辑"
        recordData={recordData}
        okHandle={updateSubmit}
        onCancel={onCancels}
      />
    </React.Fragment>
  );
};

export default connect(({ cityList, loading, exGlobal }) => ({
  cityList,
  loading: loading.models.cityList,
  exGlobal
}))(CityList);
