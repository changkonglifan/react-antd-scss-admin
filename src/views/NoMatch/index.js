/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:08:10 
 * @Last Modified by:   XuYang 
 * @Last Modified time: 2020-11-24 19:08:10 
 * 404 页面
 */
import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router'
import './index.scss'
const NoMatch = () => {
    const history = useHistory();
    const backToIndex = () => {
        history.push('/index/home')
    }
    return (
        <div>
            <div className='main-404'>
                <div className='main-img'>
                    <div className='bg-img'></div>
                </div>
                <div className='txt'>
                    <h1>404</h1>
                    <div className='des'>抱歉，你访问的页面不存在</div>
                    <Button type='primary' onClick={backToIndex}>返回首页</Button>
                </div>
            </div>
        </div>
    )
}
export default NoMatch;