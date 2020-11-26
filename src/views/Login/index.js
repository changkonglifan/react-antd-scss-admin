/*
 * @Author: XuYang 
 * @Date: 2020-11-19 14:10:32 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 10:58:39
 * 登录
 */
import React from 'react'
import { Input, Form, Button, message } from 'antd'
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import {
    login
} from '../../api/login'
import { useHistory } from 'react-router-dom'
import './index.scss';
import { enCodePassword } from '../../utils/config';
import { setCookie } from '../../utils/index'
import { useDispatch } from 'react-redux';
import { setLoginInfo } from '../../action/login';
const FormItem = Form.Item;


const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const Login = () =>{
    const [form] = Form.useForm();// 表单
    const history = useHistory();
    const dispatch = useDispatch();

    /**
     * 登录按钮
     */
    const loginHandle = ()=>{
        form.validateFields().then(async (values)=>{
            const params = {
                username: values.username,
                password: enCodePassword(values.password)
            }
            const res = await login(params);
            if(res.code === 1){
                message.success('登录成功！');
                history.push('/index/home');
                //写入toke
                setCookie('name', res.data.account.name);
                setCookie('avatar', res.data.account.avatar);
                setCookie('token', res.data.token);
                dispatch(setLoginInfo({name: res.data.account.name, avatar: res.data.account.avatar}));
            }else {
                message.error(res.msg);
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
    return (
        <div className='login-main'>
            <div className='login-bg'>
            <div className='login-center'>
                <h1>
                    后台管理系统
                </h1>
                <Form form={form}>
                    <FormItem
                        {...formItemLayout}
                        name='username'
                        rules={
                            [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                }
                            ]
                        }
                    >
                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        name='password'
                        rules={
                            [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                }
                            ]
                        }
                    >
                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
                    </FormItem>
                    <FormItem>
                        <Button type='primary' className='login-form-button' onClick={loginHandle}>
                        登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
            </div>
        </div>
    )
}

export default Login;