import React from 'react';
import { Form } from 'antd';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import { formatAuthority } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const AddRoleListView = (props) => {
    const { modalVisible, title, menuData, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: roleListFieldName['name'],
            name: 'name',
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
            spanNum: 24,
            dataTree: formatAuthority(menuData),
            rules: [
                {
                    required: true
                }
            ]
        }
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
