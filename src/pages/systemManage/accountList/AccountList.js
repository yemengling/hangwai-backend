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
import AddAccountListView from "@/pages/systemManage/accountList/sub/AddAccountListView";
import UpdateAccountListView from "@/pages/systemManage/accountList/sub/UpdateAccountListView";

// 权限名称
const listAuth = 'accountList';
const opreAuth = {
    add: 'accountList_add',
    update: 'accountList_update',
    delete: 'accountList_delete'
};

// 字段名称
export const accountListFieldName = {
    userId: 'ID',
    account: '账户',
    role: '角色',
    operate: '操作'
};

// modelsname
const modelsName = 'accountList';

const AccountList = (props) => {
    const {
        accountList: { isSearch, pagination, data },
        loading,
        dispatch,
        exGlobal: { menuData, roleList }
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
            title: accountListFieldName['userId'],
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: accountListFieldName['account'],
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: accountListFieldName['role'],
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: accountListFieldName['operate'],
            key: 'operate',
            render: (data, record) => (
                <>
                    {authDetail.update === true && <a onClick={() => handleUpdate(data)}>编辑</a>}
                    {authDetail.update === true && authDetail.delete === true && <Divider type="vertical" />}
                    {authDetail.delete === true && (
                        <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.userId)}>
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
            type: `${modelsName}/addAccountInfo`,
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
        setRecordData(data);
        setUpdateVisable(true);
    };
    const updateSubmit = (data) => {
        const { dispatch } = props;
        const submitData = data;

        submitData.userId = recordData.userId;

        dispatch({
            type: `${modelsName}/updateAccountInfo`,
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
    const handleDelete = (userId) => {
        const { dispatch } = props;
        const submitData = {
            userId
        }

        dispatch({
            type: `${modelsName}/deleteAccountInfo`,
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
            type: `${modelsName}/getAccountList`,
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

        // 获取角色列表
        dispatch({
            type: 'exGlobal/getRoleList'
        });
    }, []);

    return (
        <React.Fragment>
            {
                authDetail.add === true &&
                <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: "10px" }}>+ 新增账号</Button>
            }

            <StandardTable
                rowKey="userId"
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

            <AddAccountListView
                modalVisible={addVisable}
                title="新增"
                roleList={roleList}
                okHandle={addSubmit}
                onCancel={onCancels}
            />

            <UpdateAccountListView
                modalVisible={updateVisable}
                title="编辑"
                roleList={roleList}
                recordData={recordData}
                okHandle={updateSubmit}
                onCancel={onCancels}
            />
        </React.Fragment>
    );
};

export default connect(({ accountList, loading, exGlobal }) => ({
    accountList,
    loading: loading.models.accountList,
    exGlobal
}))(AccountList);
