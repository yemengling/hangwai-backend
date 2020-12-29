import React from 'react';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import { formatPermission, formatTree } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const UpdateRoleListView = (props) => {
    const { form, modalVisible, title, permissionList, recordData, okHandle, onCancel } = props;

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
            initialValue: formatTree(recordData.permissionIds),
            spanNum: 24,
            dataTree: formatPermission(permissionList),
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
