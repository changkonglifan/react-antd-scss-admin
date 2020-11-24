/*
 * @Author: XuYang 
 * @Date: 2020-11-19 16:52:49 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:05:14
 * 页面整体布局
 */
import React from 'react';
import {  Layout } from 'antd';

import './index.scss'
import HeaderComponent from '../../components/HeaderComponent';
import LeftSide from '../../components/LeftSide';
import RouteMain from '../Route';
import FooterComponent from '../../components/FooterComponent';

const { Content } = Layout;
    
const LayoutComponent = () => {
    return(
        <Layout className='layoutMain'>
            {/* 头部栏 */}
            <HeaderComponent></HeaderComponent>
            <Layout>
                {/* 菜单栏 */}
                <LeftSide></LeftSide>
                <Layout className='layoutContent'>
                    <Content>
                        {/* 路由 */}
                        <RouteMain></RouteMain>
                    </Content>
                    {/* 底部栏 */}
                    <FooterComponent></FooterComponent>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default  LayoutComponent;