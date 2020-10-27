import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Space, Input, Button } from 'antd';
import { connect } from 'dva';
import {
    codeResult,
    notifications
} from '@/utils/myUtils/commonUtils';
import { useLocation } from "umi";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormList from '@/components/FormList';

// 字段名称
export const updateStudentFieldName = {
    name: '姓名',
    date: '年月',
    info: '信息',
    isAdmit: '录取'
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
                    id: 1,
                    text: '是'
                },
                {
                    id: 2,
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
            picker: 'month',
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
                    name: 'city',
                    placeholder: '城区',
                    dataSelect: cityList,
                    rules: [
                        {
                            required: true,
                            message: '请输入城区'
                        }
                    ]
                },
                {
                    eleName: 'Select',
                    name: 'school',
                    placeholder: '学校',
                    dataSelect: schoolList,
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
                                        name={[field.name, 'name']}
                                        fieldKey={[field.fieldKey, 'name']}
                                        rules={[{ required: true, message: '请输入试卷名' }]}
                                    >
                                        <Input placeholder="试卷名" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'first']}
                                        fieldKey={[field.fieldKey, 'first']}
                                        rules={[{ required: true, message: '请输入第一部分' }]}
                                    >
                                        <Input placeholder="第一部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'second']}
                                        fieldKey={[field.fieldKey, 'second']}
                                        rules={[{ required: true, message: '请输入第二部分' }]}
                                    >
                                        <Input placeholder="第二部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'third']}
                                        fieldKey={[field.fieldKey, 'third']}
                                        rules={[{ required: true, message: '请输入第三部分' }]}
                                    >
                                        <Input placeholder="第三部分" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'fourth']}
                                        fieldKey={[field.fieldKey, 'fourth']}
                                        rules={[{ required: true, message: '请输入第四部分' }]}
                                    >
                                        <Input placeholder="第四部分" />
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


    const handleSubmit = (data) => {
        const { dispatch } = props;
        const submitData = data;

        dispatch({
            type: `${modelsName}/updateStudentInfo`,
            payload: submitData
        }).then((res) => {
            if (codeResult(res)) {
                // 成功
                notifications('success', '操作成功', '');
            } else {
                // 失败
                notifications('error', '系统提示', res.message);
            }
        });
    };

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
        dispatch({
            type: 'exGlobal/getSchoolList'
        });
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
            />
        </React.Fragment>
    );
};

export default connect(({ updateStudent, loading, exGlobal }) => ({
    updateStudent,
    loading: loading.models.updateStudent,
    exGlobal
}))(UpdateStudent);