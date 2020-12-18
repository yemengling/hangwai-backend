import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { studentListFieldName } from "@/pages/dataManage/studentList/StudentList";
import { formatCity, formatSchool } from "@/utils/myUtils/renderUtils";
import SearchForm from '@/components/SearchForm';

const StudentListSearchForm = (props) => {
    const { cityList, schoolList, handleSearch, handleFormReset } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'RangePicker',
            title: '年份',
            name: 'year',
            picker: 'year'
        },
        {
            eleName: 'Select',
            title: studentListFieldName['city'],
            name: 'cityId',
            dataSelect: formatCity(cityList)
        },
        {
            eleName: 'Select',
            title: studentListFieldName['school'],
            name: 'schoolId',
            dataSelect: formatSchool(schoolList)
        }
    ];

    return (
        <SearchForm
            form={form}
            element={element}
            handleSearch={handleSearch}
            handleFormReset={handleFormReset}
        />
    )
}

export default StudentListSearchForm;