import React from 'react';
import { Form } from 'antd';
import { accountListFieldName } from "@/pages/systemManage/accountList/AccountList";
import MyModal from "@/components/MyModal";

const UpdateAccountListView = (props) => {
    const { modalVisible, title, roleList, recordData, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: accountListFieldName['account'],
            name: 'account',
            initialValue: recordData.account,
            spanNum: 24
        },
        {
            eleName: 'Select',
            title: accountListFieldName['role'],
            name: 'role',
            initialValue: '',
            spanNum: 24,
            initialValue: recordData.role,
            dataSelect: roleList
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
