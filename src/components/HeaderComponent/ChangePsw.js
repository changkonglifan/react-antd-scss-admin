/*
* @Author: XuYang 
* @Date: 2020-11-24 19:02:24 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:03:10
* 修改密码 
*/
import React, {useState, useEffect} from 'react';
import { Form, Input, message, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types';
import { useHistory, userHistory } from  'react-router-dom';
import { enCodePassword } from '../../utils/config';
import {
    changePassword
} from '../../api/user'
const Item = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
let secondsToGo = 3;
let modal = null;
let timer = null;
const ChangePsw = (props) => {
    const {onCancel} = props;
    const [form] = Form.useForm();
    const history = useHistory();
    const [newPsw, setNewPsw] = useState(''); // 新密码
    useEffect(() => {
        return componentWillUnmount;
    }, []);
    
    // 组件销毁时你要执行的代码 销毁
    function componentWillUnmount() {
        if(timer){
            clearInterval(timer);
        }
        if(modal){
            modal.destroy();  
        }
    }
    /**
     * 新密码修改
     */
    const newPswChange = (e)  =>{
        setNewPsw(e.target.value);
    }
    /**
     * 确认修改
     */
    const onOk = () => {
        form.validateFields().then( async (values)=>{
            const params = {
                password: enCodePassword(values.password),
                newPassword: enCodePassword(values.newPassword)
            }
            const res = await changePassword(params);
            if(res.code === 1){
                countDown();
            }else {
                message.error(res.msg);
            }
        }).catch((err)=>{

        })
    }
    /**
     * 倒计时 跳转到登录
     */
    const countDown = () => {
        modal = Modal.success({
            title: '修改成功',
            content: `请重新登录, ${secondsToGo} 秒后将跳转到登录页.`,
            onOk(){
                history.push("/login");
            }
        });
        timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `请重新登录, ${secondsToGo} 秒后将跳转到登录页.`,
            });
        }, 1000);
        setTimeout(() => {
            history.push("/login");
            clearInterval(timer);
            modal.destroy();
            timer =  null;
            modal = null;
        }, secondsToGo * 1000);
    }
    return (
        <Modal
            title="修改密码"
            visible={true}
            okText="修改"
            cancelText="取消"
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form {...layout} form={form} name="changePsw">
                <Item
                    name="password"
                    label="原密码"
                    rules={
                        [
                            {
                                required: true, message: "原密码不能为空"
                            }
                        ]
                    }
                >
                    <Input.Password placeholder="请输入原密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                </Item>
                <Item
                    name="newPassword"
                    label="新密码"
                    rules={
                        [
                            {
                                required: true, message: "新密码不能为空"
                            }
                        ]
                    }
                >
                    <Input.Password placeholder="请输入新密码" onChange={newPswChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                </Item>
                <Item
                    name="confirmPassword"
                    label="确认新密码"
                    rules={
                        [
                            {
                                required: true, message: "请确认新密码"
                            },
                            {
                                validator:(rule, value, callback) => {
                                    try {
                                        if(newPsw !== value){
                                            throw new Error('两次密码不相同!');
                                        }else{
                                            callback();
                                        }
                                    } catch (err) {
                                        callback(err);
                                    }
                                }
                            }
                        ]
                    }
                >
                    <Input.Password placeholder="请确认密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                </Item>
            </Form>
        </Modal>
    )
}
ChangePsw.propTypes = {
    onCancel: PropTypes.func.isRequired
}
export default ChangePsw;