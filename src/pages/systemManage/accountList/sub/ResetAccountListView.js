import React from 'react';
import { accountListFieldName } from "@/pages/systemManage/accountList/AccountList";
import { formatRole } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const ResetAccountListView = (props) => {
    const { form, modalVisible, title, okHandle, onCancel } = props;

    const formLayout = {
        itemLayout: {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            }
        }
    };

    const element = [
        {
            eleName: 'Input',
            title: '密码',
            type: 'password',
            name: 'password',
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Input',
            title: '确定密码',
            type: 'password',
            name: 'password2',
            spanNum: 24,
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
            formLayout={formLayout}
            modalVisible={modalVisible && modalVisible}
            title={title && title}
            element={element && element}
            okHandle={okHandle && okHandle}
            onCancel={onCancel && onCancel}
        />
    )
};

export default ResetAccountListView;
