import React from 'react';
import { Form } from 'antd';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import { formatAuthority } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const UpdateRoleListView = (props) => {
    const { modalVisible, title, menuData, recordData, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: roleListFieldName['name'],
            name: 'name',
            initialValue: recordData.name,
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Input',
            title: roleListFieldName['remark'],
            name: 'remark',
            initialValue: recordData.remark,
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'TreeSelect',
            title: '权限',
            name: 'permissionIds',
            initialValue: [1001],
            spanNum: 24,
            dataTree: formatAuthority(menuData),
            rules: [
                {
                    required: true
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
