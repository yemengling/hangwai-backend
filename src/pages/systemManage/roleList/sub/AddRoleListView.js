import React from 'react';
import { Form } from 'antd';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import MyModal from "@/components/MyModal";

const AddRoleListView = (props) => {
    const { modalVisible, title, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: roleListFieldName['name'],
            name: 'name',
            spanNum: 24
        },
        {
            eleName: 'Input',
            title: roleListFieldName['remark'],
            name: 'remark',
            spanNum: 24
        },
        {
            eleName: 'CheckboxGroup',
            title: '权限',
            name: 'permissionList',
            spanNum: 24,
            dataCheck: [
                {
                    id: 'create',
                    text: '新增'
                },
                {
                    id: 'update',
                    text: '编辑'
                },
                {
                    id: 'delete',
                    text: '删除'
                }
            ]
        },
    ];

    return (
        <MyModal
            form={form}
            modalVisible={modalVisible && modalVisible}
            title={title && title}
            element={element && element}
            okHandle={okHandle && okHandle}
            onCancel={onCancel && onCancel}
        />
    )
};

export default AddRoleListView;
