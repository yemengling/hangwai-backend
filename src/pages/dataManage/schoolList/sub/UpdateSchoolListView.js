import React from 'react';
import { schoolListFieldName } from "@/pages/dataManage/schoolList/SchoolList";
import { formatCity } from "@/utils/myUtils/renderUtils";
import MyModal from "@/components/MyModal";

const UpdateSchoolListView = (props) => {
    const { form, modalVisible, title, cityList, recordData, dispatch, okHandle, onCancel } = props;
    
    const element = [
        {
            eleName: 'Select',
            title: schoolListFieldName['city'],
            name: 'cityId',
            initialValue: recordData.cityId,
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
            initialValue: recordData.name,
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
