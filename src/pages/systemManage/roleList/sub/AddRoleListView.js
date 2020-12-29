import React from 'react';
import { roleListFieldName } from "@/pages/systemManage/roleList/RoleList";
import { formatPermission } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";
import { fromPairs } from 'lodash';

const AddRoleListView = (props) => {
    const { form, modalVisible, title, permissionList, okHandle, onCancel } = props;
    
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
            dataTree: formatPermission(permissionList),
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
