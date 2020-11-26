/*
 * @Author: XuYang 
 * @Date: 2020-11-23 18:25:05 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 11:25:46
 * 头部栏
 */
import React, { useState } from 'react'
import { Dropdown, Layout, Menu, Avatar, Modal, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getCookie } from '../../utils';
import { logout } from '../../api/user'
// import PropTypes from 'prop-types'
import logo from '../../statics/logo.png'
import './index.scss'
import {
    UnlockOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import ChangePsw from './ChangePsw';
const { Header } = Layout;

const HeaderComponent = () =>{
    const history = useHistory();
    const {loginInfo}  = useSelector(state => state.login)
    const [isShowChangePSw, setShowChangePsw] = useState(false); //是否显示修改密码弹窗
     /**
     * 菜单选择
     */
    const menuChange = (item) =>{
        switch(item.key){
            case "logout":
                Modal.confirm({
                    title:'确定退出登录?',
                    okText:'退出',
                    okType:'danger',
                    cancelText:'取消',
                    onOk(){
                        logoutHandle();
                    }
                });
                break;
            case "changePsw":
                setShowChangePsw(true);
                break;
            default: 
                return;

        }
    }
    /**
     * 退出登录
     */
    const logoutHandle = async () => {
        const res = await logout();
        if(res.code ===  1){
            message.success('退出成功!');
            history.push('/login')
        }else {
            message.error(res.msg);
        }
    }
    /**
     * 隐藏修改密码弹窗
     */
    const hideChangePsw = () =>{
        setShowChangePsw(false)
    }
    return (
        <Header className='layoutHeader'>
            <div className="logo" >
                <img src={logo}></img><span>后台管理</span>
            </div>
            <div className='userInfo'>
                <Dropdown className='drop' overlay={
                    <Menu onClick={menuChange}>
                        <Menu.Item key='changePsw'><UnlockOutlined />修改密码</Menu.Item>
                        <Menu.Item key='logout'><LogoutOutlined/>退出登录</Menu.Item>
                    </Menu>
                }>
                    <div>
                        <Avatar src={loginInfo.avatar || getCookie('avatar')}></Avatar>
                        <span className='user'>{loginInfo.name ||  getCookie('name')}</span>
                    </div>
                </Dropdown>
            </div>
            {
                isShowChangePSw &&
                <ChangePsw 
                    onCancel={hideChangePsw}
                ></ChangePsw>
            }
        </Header>
    )
}
HeaderComponent.propTypes = {
}
export default HeaderComponent;