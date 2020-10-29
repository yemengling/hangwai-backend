import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import { getAuthorityOpreateArea, getAuthorityOpreatDetail } from '@/utils/myUtils/authority';
import {
    codeResult,
    notifications,
    updateCurrentPage,
    onChangePage,
    onChangePageSize
} from '@/utils/myUtils/commonUtils';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import StandardTable from '@/components/StandardTable';
import AddRoleListView from "@/pages/systemManage/roleList/sub/AddRoleListView";
import UpdateRoleListView from "@/pages/systemManage/roleList/sub/UpdateRoleListView";

// 权限名称
const listAuth = 'roleList';
const opreAuth = {
    add: 'roleList_add',
    update: 'roleList_update',
    delete: 'roleList_delete'
};

// 字段名称
export const roleListFieldName = {
    id: 'ID',
    name: '角色',
    isAdd: '新增',
    isUpdate: '编辑',
    isDelete: '删除',
    operate: '操作'
};

// modelsname
const modelsName = 'roleList';

const RoleList = (props) => {
    const {
        roleList: { isSearch, pagination, data },
        loading,
        dispatch,
        exGlobal: { menuData }
    } = props;

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
            title: roleListFieldName['id'],
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: roleListFieldName['name'],
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: roleListFieldName['isAdd'],
            dataIndex: 'isAdd',
            key: 'isAdd',
            render: (data, record) => (
                <>
                    {data === 1 ? <CheckOutlined /> : <CloseOutlined />}
                </>
            )
        },
        {
            title: roleListFieldName['isUpdate'],
            dataIndex: 'isUpdate',
            key: 'isUpdate',
            render: (data, record) => (
                <>
                    {data === 1 ? <CheckOutlined /> : <CloseOutlined />}
                </>
            )
        },
        {
            title: roleListFieldName['isDelete'],
            dataIndex: 'isDelete',
            key: 'isDelete',
            render: (data, record) => (
                <>
                    {data === 1 ? <CheckOutlined /> : <CloseOutlined />}
                </>
            )
        },
        {
            title: roleListFieldName['operate'],
            key: 'operate',
            render: (data, record) => (
                <>
                    {authDetail.update === true && <a onClick={() => handleUpdate(data)}>编辑</a>}
                    {authDetail.update === true && authDetail.delete === true && <Divider type="vertical" />}
                    {authDetail.delete === true && (
                        <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.id)}>
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
    };
    const addSubmit = (value) => {
        const { dispatch } = props;
        const submitData = value;

        dispatch({
            type: `${modelsName}/addRoleInfo`,
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
                notifications('error', '系统提示', res.message);
            }
        });
    };

    // 编辑
    const handleUpdate = (data) => {
        let checkList = [];

        if (data.isAdd === 1) {
            checkList.push('add');
        }
        if (data.isUpdate === 1) {
            checkList.push('update');
        }
        if (data.isDelete === 1) {
            checkList.push('delete');
        }
        data.checkList = checkList;

        setRecordData(data);
        setUpdateVisable(true);
    };
    const updateSubmit = (data) => {
        const { dispatch } = props;
        const submitData = data;

        submitData.id = recordData.id;

        dispatch({
            type: `${modelsName}/updateRoleInfo`,
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
                notifications('error', '系统提示', res.message);
            }
        });
    };

    // 删除
    const handleDelete = (id) => {
        const { dispatch } = props;
        const submitData = {
            id
        }

        dispatch({
            type: `${modelsName}/deleteRoleInfo`,
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
                notifications('error', '系统提示', res.message);
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
            type: `${modelsName}/getRoleList`,
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
                <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增角色</Button>
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

            <AddRoleListView
                modalVisible={addVisable}
                title="新增"
                okHandle={addSubmit}
                onCancel={onCancels}
            />

            <UpdateRoleListView
                modalVisible={updateVisable}
                title="编辑"
                recordData={recordData}
                okHandle={updateSubmit}
                onCancel={onCancels}
            />
        </React.Fragment>
    );
};

export default connect(({ roleList, loading, exGlobal }) => ({
    roleList,
    loading: loading.models.roleList,
    exGlobal
}))(RoleList);
