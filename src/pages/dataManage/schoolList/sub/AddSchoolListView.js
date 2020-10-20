import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { schoolListFieldName } from "@/pages/dataManage/schoolList/SchoolList";
import MyModal from "@/components/MyModal";

const config = {
    labelCol: 7,
    wrapperCol: 16
};

const AddSchoolListView = (props) => {
    const { modalVisible, title, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'Input',
            title: schoolListFieldName['city'],
            name: 'city',
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Input',
            title: schoolListFieldName['school'],
            name: 'school',
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        }
    ];

    return (
        <MyModal
            config={config && config}
            form={form}
            modalVisible={modalVisible && modalVisible}
            title={title && title}
            element={element && element}
            okHandle={okHandle && okHandle}
            onCancel={onCancel && onCancel}
        />
    )
};

export default connect(({ loading, exGlobal }) => ({
    loading: loading.models.exGlobal,
    exGlobal
}))(AddSchoolListView);
