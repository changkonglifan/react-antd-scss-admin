/*
 * @Author: XuYang 
 * @Date: 2020-11-19 16:52:41 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:05:03
 * 首页
 */
import { Card, Row, Col, Statistic } from 'antd';
import React from 'react';
import './index.scss';

const Home = () => {
    return (
        <div className='home'>
            {/* 头部栏 */}
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title='当前用户总数'
                                value={0}
                            >
                            </Statistic>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title='当前文章总数'
                                value={0}
                            >
                            </Statistic>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title='分类总数'
                                value={0}
                            >
                            </Statistic>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Home;