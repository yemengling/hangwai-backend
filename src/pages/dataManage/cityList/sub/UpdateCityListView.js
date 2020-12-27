import React from 'react';
import { cityListFieldName } from "@/pages/dataManage/cityList/CityList";
import MyModal from "@/components/MyModal";

const UpdateCityListView = (props) => {
    const { form, modalVisible, title, recordData, okHandle, onCancel } = props;
    
    const element = [
        {
            eleName: 'Input',
            title: cityListFieldName['name'],
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

export default UpdateCityListView;
