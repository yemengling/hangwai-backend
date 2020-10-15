import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'antd';
import { getDatePicker, getInput } from './element';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.less';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpread: false
        }
    }

    // 查询
    handleSearch = () => {
        const { form, handleSearch } = this.props;

        form.validateFields().then(values => {
            handleSearch(values);
        }).catch(errorInfo => {

        });
    }

    // 重置
    handleFormReset = () => {
        const { form, handleFormReset } = this.props;

        form.resetFields();
        handleFormReset();
    }

    // 展开收起
    toggleForm = () => {
        let { isSpread } = this.state;

        this.setState({
            isSpread: !isSpread
        });
    }

    // 配置表单元素
    selectElement = () => {
        const { element } = this.props;
        const { isSpread } = this.state;

        let recordArr = [];
        let groupArr = [];
        let ele = '';
        let submit = '';
        if(element.length > 0){
            for (let i = 0; i < element.length; i++) {
                recordArr.push(element[i]);

                if ((i + 1) % 3 === 0) {
                    groupArr.push(recordArr);
                    recordArr = [];
                }
            }

            if (recordArr.length > 0) {
                groupArr.push(recordArr);
                recordArr = [];
            }
            
            ele = groupArr.map((list, key) => {
                let rowEle = '';

                rowEle = list.map((item, key) => {
                    const { eleName, title, name, placeholder } = item;

                    if (! placeholder) {
                        item.placeholder = title;
                    }

                    if(eleName === 'DatePicker'){
                        return this.formCol({
                            key,
                            title,
                            name,
                            comFun: getDatePicker({ picker: item.picker }),
                            _props: { ...item }
                        })
                    }

                    if(eleName === 'Input'){
                        return this.formCol({
                            key,
                            title,
                            name,
                            comFun: getInput({ placeholder: item.placeholder }),
                            _props: { ...item }
                        })
                    }
                });

                if (key === 0) {
                    return <Row key={key} gutter={{ md: 8, lg: 24, xl: 48 }}>{rowEle}</Row>;
                } else {
                    return isSpread ? <Row key={key} gutter={{ md: 8, lg: 24, xl: 48 }}>{rowEle}</Row> : '';
                }
            });
        }

        if(groupArr.length > 1) {
            submit = 
                <div className={styles.submit}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleFormReset}>
                        清除
                    </Button>
                    {
                        isSpread ?
                            <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                                收起 <UpOutlined />
                            </a> : 
                            <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                                展开 <DownOutlined />
                            </a>
                    }
                </div>
        }else{
            submit = 
                <div className={styles.submit}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleFormReset}>
                        清除
                    </Button>
                </div>
        }

        return <div>
            {ele}
            {submit}
        </div>
    }

    // 表单元素格式
    formCol = ({ key, title, name, comFun, _props }) => {
        return <Col key={key} md={8} sm={24}>
            <Form.Item label={title} name={name} rules={_props.rules}>
                {comFun}
            </Form.Item>
        </Col>
    }

    render() {
        const { form } = this.props;
          
        return (
            <div className={styles.searchForm}>
                <Form form={form} onFinish={this.handleSearch}>
                    {this.selectElement()}
                </Form>
            </div>
        )
    }
}

export default SearchForm;