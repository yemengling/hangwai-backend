import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';

// 字段名称
export const roleListFieldName = {
    id: 'ID',
    name: '角色',
    add: '新增',
    uadate: '编辑',
    delete: '删除',
    operate: '操作'
};

// modelsname
const modelsName = 'roleList';

const SetRole = (props) => {
    const {
        roleList: { },
        loading,
        dispatch
    } = props;


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
            title: roleListFieldName['add'],
            dataIndex: 'add',
            key: 'add',
        },
        {
            title: roleListFieldName['uadate'],
            dataIndex: 'uadate',
            key: 'uadate',
        },
        {
            title: roleListFieldName['delete'],
            dataIndex: 'delete',
            key: 'delete',
        },
        {
            title: roleListFieldName['operate'],
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
            )
        },
    ];


    // didMount
    useEffect(() => {

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
    )
}

export default connect(({ roleList, loading }) => ({
    roleList,
    loading: loading.models.roleList
}))(RoleList);