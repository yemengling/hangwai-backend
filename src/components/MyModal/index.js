import React, { Component } from 'react';
import { Modal, Form, Col, Row, Button } from 'antd';
import { getInput } from './element';
import styles from './index.less';

class MyModal extends Component {
    constructor(props) {
        super(props);
    }

    // 确定
    okHandle = () => {
        const { form, okHandle } = this.props;

        if (form) {
            form.validateFields().then(values => {
                okHandle(values);
            }).catch(errorInfo => {

            });
        } else {
            okHandle();
        }
    }

    // 配置表单元素
    selectElement = () => {
        const { element } = this.props;

        let ele = '';
        if(element.length > 0){
            ele = element.map((item, key) => {
                const { eleName, title, name, placeholder } = item;
                let rowEle = '';

                if (! placeholder) {
                    item.placeholder = title;
                }

                if (eleName === 'Input') {
                    rowEle = this.formCol({
                        key,
                        title,
                        name,
                        comFun: getInput({
                            placeholder: item.placeholder,
                            initialValue: item.initialValue
                        }),
                        _props: { ...item }
                    })
                }

                return <Row key={key} gutter={8}>{rowEle}</Row>;
            });
        }

        return <div>
            {ele}
        </div>
    }

    // 表单元素格式
    formCol = ({ key, title, name, comFun, _props }) => {
        return <Col key={key} span={_props.spanNum}>
            <Form.Item label={title} name={name} initialValue={_props.initialValue} rules={_props.rules}>
                {comFun}
            </Form.Item>
        </Col>
    }

    render() {
        const { form, modalVisible, title, onCancel } = this.props;

        return (
            <Modal
                visible={modalVisible}
                title={title}
                onOk={this.okHandle}
                onCancel={() => onCancel()}
            >
                <Form form={form}>
                    {this.selectElement()}
                </Form>
            </Modal>
        )
    }
}

export default MyModal;