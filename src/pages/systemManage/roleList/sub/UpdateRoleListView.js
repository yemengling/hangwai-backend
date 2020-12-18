import React from 'react';
import { Form } from 'antd';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import MyModal from "@/components/MyModal";

const UpdateRoleListView = (props) => {
    const { modalVisible, title, recordData, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: roleListFieldName['name'],
            name: 'name',
            initialValue: recordData.name,
            spanNum: 24
        },
        {
            eleName: 'Input',
            title: roleListFieldName['remark'],
            name: 'remark',
            initialValue: recordData.remark,
            spanNum: 24
        },
        {
            eleName: 'CheckboxGroup',
            title: '权限',
            name: 'authority',
            initialValue: recordData.checkList,
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
            initialValues={recordData.initialValues}
            element={element && element}
            okHandle={okHandle && okHandle}
            onCancel={onCancel && onCancel}
        />
    )
};

export default UpdateRoleListView;
