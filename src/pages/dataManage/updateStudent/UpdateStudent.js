import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Space, Input, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import {
    codeResult,
    notifications
} from '@/utils/myUtils/commonUtils';
import { history, useLocation } from "umi";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatCity, formatSchool } from "@/utils/myUtils/renderUtils";
import FormList from '@/components/FormList';
import moment from 'moment';

// 字段名称
export const updateStudentFieldName = {
    isAdmit: '录取',
    sex: '性别',
    name: '姓名',
    date: '日期',
    info: '信息'
};

// modelsname
const modelsName = 'updateStudent';

const UpdateStudent = (props) => {
    const {
        updateStudent: { data },
        loading,
        dispatch,
        exGlobal: { cityList, schoolList }
    } = props;

    // 地址栏
    const location = useLocation();

    const [form] = Form.useForm();
    const formLayout = {
        itemLayout: {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 18
            }
        },
        buttonItemLayout: {
            wrapperCol: {
                offset: 2,
                span: 18
            }
        }
    }

    // element
    const element = [
        {
            eleName: 'Radio',
            title: updateStudentFieldName['isAdmit'],
            name: 'isAdmit',
            spanNum: 24,
            dataRadio: [
                {
                    id: true,
                    text: '是'
                },
                {
                    id: false,
                    text: '否'
                }
            ],
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Radio',
            title: updateStudentFieldName['sex'],
            name: 'sex',
            spanNum: 24,
            dataRadio: [
                {
                    id: 1,
                    text: '男'
                },
                {
                    id: 2,
                    text: '女'
                }
            ],
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Input',
            title: updateStudentFieldName['name'],
            name: 'name',
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'DatePicker',
            title: updateStudentFieldName['date'],
            name: 'date',
            picker: 'date',
            spanNum: 24,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            eleName: 'Multitype',
            title: updateStudentFieldName['info'],
            name: 'info',
            spanNum: 24,
            required: true,
            formData: [
                {
                    eleName: 'Select',
                    name: 'cityId',
                    placeholder: '城区',
                    dataSelect: formatCity(cityList),
                    rules: [
                        {
                            required: true,
                            message: '请输入城区'
                        }
                    ],
                    onChange: function(value){
                        // 获取学校列表
                        if(value){
                            getSchoolList(value);

                            form.setFieldsValue({
                                schoolId: null
                            });
                        }
                    }
                },
                {
                    eleName: 'Select',
                    name: 'schoolId',
                    placeholder: '学校',
                    dataSelect: formatSchool(schoolList),
                    rules: [
                        {
                            required: true,
                            message: '请输入学校'
                        }
                    ]
                }
            ]
        }
    ];

    // extraDom
    const extraDom =
        <Row className="ant-form-item" gutter={8}>
            <Col className="ant-form-item-label" style={{ padding: 0 }} span={2}>
                <label className="ant-form-item-required">试卷</label>
            </Col>

            <Col span={18}>
                <Form.List name="papers">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'paper']}
                                        fieldKey={[field.fieldKey, 'paper']}
                                        rules={[{ required: true, message: '请输入试卷名' }]}
                                    >
                                        <Input placeholder="试卷名" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'part1']}
                                        fieldKey={[field.fieldKey, 'part1']}
                                        rules={[{ required: true, message: '请输入第一部分' }]}
                                    >
                                        <InputNumber placeholder="第一部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'part2']}
                                        fieldKey={[field.fieldKey, 'part2']}
                                        rules={[{ required: true, message: '请输入第二部分' }]}
                                    >
                                        <InputNumber placeholder="第二部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'part3']}
                                        fieldKey={[field.fieldKey, 'part3']}
                                        rules={[{ required: true, message: '请输入第三部分' }]}
                                    >
                                        <InputNumber placeholder="第三部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'part4']}
                                        fieldKey={[field.fieldKey, 'part4']}
                                        rules={[{ required: true, message: '请输入第四部分' }]}
                                    >
                                        <InputNumber placeholder="第四部分" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" icon={<PlusOutlined />} block onClick={() => add()}>
                                    添加试卷
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Col>
        </Row>
        ;

    
    const getSchoolList = (cityId) => {
        const submitData = {
            cityId
        };

        dispatch({
            type: 'exGlobal/getSchoolList',
            payload: submitData
        });
    }

    const handleSubmit = (data) => {
        const { dispatch } = props;
        const submitData = data;

        if(submitData.papers && submitData.papers[0]){
            submitData.studentId = location.query.id;
            submitData.date = moment(moment(submitData.date).valueOf()).format('YYYY-MM-DD');
            
            dispatch({
                type: `${modelsName}/updateStudentInfo`,
                payload: submitData
            }).then((res) => {
                if (codeResult(res)) {
                    // 成功
                    notifications('success', '操作成功', '');
                    history.push('/dataManage/studentList');
                } else {
                    // 失败
                    // notifications('error', '系统提示', res.message);
                }
            });
        }else{
            notifications('error', '系统提示', '请录入试卷');
        }
    };

    const handleCancel = () => {
        history.push('/dataManage/studentList');
    }

    // 获取数据, 收到的数据, 写到infoData中，就是modal中的fetch函数
    const getCurrentInfo = (params) => {
        dispatch({
            type: `${modelsName}/getStudentInfo`,
            payload: {
                ...params
            },
        }).then((res) => {
            form.resetFields();
            console.log('res___', res);

            // 获取学校列表
            getSchoolList(res.r.cityId);
        });
    };

    // didMount
    useEffect(() => {
        getCurrentInfo({
            id: location.query.id
        });

        // 获取城区列表
        dispatch({
            type: 'exGlobal/getCityList'
        });

        // 获取学校列表
        getSchoolList();
    }, []);

    return (
        <React.Fragment>
            <FormList
                form={form}
                formLayout={formLayout}
                initialValues={data.data}
                element={element}
                extraDom={extraDom}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </React.Fragment>
    );
};

export default connect(({ updateStudent, loading, exGlobal }) => ({
    updateStudent,
    loading: loading.models.updateStudent,
    exGlobal
}))(UpdateStudent);