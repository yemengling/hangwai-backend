import React from 'react';
import { schoolListFieldName } from "@/pages/dataManage/schoolList/SchoolList";
import { formatCity } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const AddSchoolListView = (props) => {
    const { form, modalVisible, title, cityList, dispatch, okHandle, onCancel } = props;

    const element = [
        {
            eleName: 'Select',
            title: schoolListFieldName['city'],
            name: 'cityId',
            spanNum: 24,
            dataSelect: formatCity(cityList),
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Input',
            title: schoolListFieldName['name'],
            name: 'name',
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

export default AddSchoolListView;
