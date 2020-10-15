import React, { useState } from 'react';
import { Alert, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import { 
    codeResult, 
    notifications 
} from '@/utils/myUtils/commonUtils';
import { UserOutlined, LockTwoTone } from '@ant-design/icons';
import styles from './index.less';

const MyLogin = (props) => {
    const {
        submitLoading,
        dispatch
    } = props;

    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            dispatch({
                type: 'login/login',
                payload: {
                    ...values
                }
            }).then((res) => {
                // if (codeResult(res)) {
                //     // 成功
                // } else {
                //     // 失败
                //     notifications('error', '系统提示', res.message);
                // }
            });
        }).catch(errorInfo => {
            
        });
    }

    return (
        <div className={styles.myLogin}>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!'
                        }
                    ]}
                >
                    <Input
                        size="large"
                        prefix={
                            <UserOutlined
                                style={{
                                    color: '#1890ff',
                                }}
                            />
                        }
                        placeholder="用户名: admin or user"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！'
                        },
                    ]}
                >
                    <Input
                        size="large"
                        prefix={
                            <LockTwoTone
                                style={{
                                    color: '#1890ff',
                                }}
                            />
                        }
                        placeholder="密码: ant.design"
                    />
                </Form.Item>

                <Form.Item>
                    <Button className={styles.submit}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={submitLoading}
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default connect(({ myLogin, loading }) => ({
    myLogin,
    submitLoading: loading.effects['login/login']
}))(MyLogin);