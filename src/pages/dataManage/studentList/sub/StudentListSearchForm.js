import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import SearchForm from '@/components/SearchForm';
import { studentListFieldName } from "@/pages/dataManage/studentList/StudentList";

const StudentListSearchForm = (props) => {
    const { handleSearch, handleFormReset } = props;
    const [form] = Form.useForm();

    const element = [
        {
            eleName: 'DatePicker',
            title: '年份',
            name: 'year',
            picker: 'year'
        },
        {
            eleName: 'Input',
            title: studentListFieldName['city'],
            name: 'city'
        },
        {
            eleName: 'Input',
            title: studentListFieldName['school'],
            name: 'school'
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