import React from 'react';
import { Form } from 'antd';
import { schoolListFieldName } from "@/pages/dataManage/schoolList/SchoolList";
import MyModal from "@/components/MyModal";

const UpdateSchoolListView = (props) => {
    const { modalVisible, title, recordData, dispatch, okHandle, onCancel } = props;
    const [form] = Form.useForm();
    
    const element = [
        {
            eleName: 'Input',
            title: schoolListFieldName['city'],
            name: 'city',
            initialValue: recordData.city,
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
            initialValue: recordData.school,
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
            form={form}
            modalVisible={modalVisible && modalVisible}
            title={title && title}
            element={element && element}
            okHandle={okHandle && okHandle}
            onCancel={onCancel && onCancel}
        />
    )
};

export default UpdateSchoolListView;
