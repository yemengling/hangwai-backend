import React, { Component } from 'react';
import { Form, Col, Row, Input, Button } from 'antd';
import { getInput, getDatePicker, getSelect, getRadio, getMultitype } from './element';
import styles from './index.less';

class FormList extends Component {
    constructor(props) {
        super(props);
    }

    // 配置表单元素
    selectElement = () => {
        const { formLayout, element, extraDom, onCancel } = this.props;

        let ele = '';
        let submit = '';
        let buttonItemLayout = {};

        if (formLayout) {
            buttonItemLayout = formLayout.buttonItemLayout;
        } else {
            buttonItemLayout = {
                wrapperCol: {
                    offset: 5,
                    span: 15
                }
            }
        }

        if (element.length > 0) {
            ele = element.map((item, key) => {
                const { eleName, title, name, placeholder } = item;
                let rowEle = '';

                if (!placeholder) {
                    item.placeholder = title;
                }

                if (eleName === 'Input') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getInput({
                            placeholder: item.placeholder
                        }),
                        _props: { ...item }
                    })
                }

                if (eleName === 'DatePicker') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getDatePicker({
                            picker: item.picker,
                            placeholder: item.placeholder
                        }),
                        _props: { ...item }
                    })
                }

                if (eleName === 'Select') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getSelect({
                            dataSelect: item.dataSelect,
                            placeholder: item.placeholder
                        }),
                        _props: { ...item }
                    })
                }

                if (eleName === 'Radio') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getRadio({
                            dataRadio: item.dataRadio,
                            name
                        }),
                        _props: { ...item }
                    })
                }

                if (eleName === 'Multitype') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getMultitype({
                            formData: item.formData
                        }),
                        _props: { ...item }
                    })
                }

                return <Row key={key} gutter={8}>{rowEle}</Row>;
            });

            submit =
                <Form.Item className={styles.submit} {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>

                    <Button type="link" htmlType="button" onClick={onCancel}>
                        取消
                    </Button>
                </Form.Item>
        }

        return <div>
            {ele}
            {extraDom}
            {submit}
        </div>
    }

    // 表单元素格式
    formCol = ({ key, title, name, comFun, _props }) => {
        const { formLayout } = this.props;
        let formItemLayout = {};

        if (formLayout) {
            formItemLayout = formLayout.itemLayout;
        } else {
            formItemLayout = {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 15
                }
            }
        }

        if (comFun.length > 1) {
            return <Col key={key} span={_props.spanNum}>
                <Form.Item {...formItemLayout} style={{ marginBottom: 0 }}
                    label={title} required={_props.required}
                >
                    {comFun}
                </Form.Item>
            </Col>
        } else {
            return <Col key={key} span={_props.spanNum}>
                <Form.Item {...formItemLayout}
                    label={title} name={name}
                    rules={_props.rules}
                >
                    {comFun}
                </Form.Item>
            </Col>
        }
    }


    render() {
        const { form, initialValues, onSubmit } = this.props;

        return (
            <Form form={form} className={styles.formList}
                initialValues={initialValues}
                onFinish={onSubmit}
            >
                {this.selectElement()}
            </Form>
        )
    }
}

export default FormList;