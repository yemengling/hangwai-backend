import React from 'react';
import { Form } from 'antd';
import { accountListFieldName } from "@/pages/systemManage/accountList/AccountList";
import { formatRole } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const ResetAccountListView = (props) => {
    const { modalVisible, title, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: '密码',
            type: 'password',
            name: 'password',
            spanNum: 24
        },
        {
            eleName: 'Input',
            title: '确定密码',
            type: 'password',
            name: 'password2',
            spanNum: 24
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

export default ResetAccountListView;
