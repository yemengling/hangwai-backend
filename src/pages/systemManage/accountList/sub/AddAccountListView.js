import React from 'react';
import { Form } from 'antd';
import { accountListFieldName } from "@/pages/systemManage/accountList/AccountList";
import MyModal from "@/components/MyModal";

const AddAccountListView = (props) => {
    const { modalVisible, title, roleList, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: accountListFieldName['account'],
            name: 'account',
            spanNum: 24
        },
        {
            eleName: 'Select',
            title: accountListFieldName['role'],
            name: 'role',
            spanNum: 24,
            dataSelect: roleList
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

export default AddAccountListView;
