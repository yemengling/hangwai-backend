import React from 'react';
import { Form } from 'antd';
import { accountListFieldName } from "@/pages/systemManage/accountList/AccountList";
import { formatRole } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const UpdateAccountListView = (props) => {
    const { modalVisible, title, roleList, recordData, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: accountListFieldName['account'],
            name: 'account',
            initialValue: recordData.account,
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Select',
            title: accountListFieldName['roleName'],
            name: 'roleId',
            initialValue: recordData.roleId,
            spanNum: 24,
            dataSelect: formatRole(roleList),
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

export default UpdateAccountListView;
