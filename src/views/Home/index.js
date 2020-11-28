/*
 * @Author: XuYang
 * @Date: 2020-11-19 16:52:41
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:05:03
 * 首页
 */
import React,{ useEffect } from 'react';
import { Card, Row, Col, Statistic, Alert } from 'antd';
import echarts from 'echarts'
import './index.scss';

const Home = () => {
    useEffect(() => {
        initChartsLeft();
        initChartsRight();
        return () => {
        }
    }, [])
    /**
     * 左边菜单
     */
    const initChartsLeft = () =>{
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '测试',
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '开发',
                    type: 'bar',
                    stack: '广告',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '产品',
                    type: 'bar',
                    stack: '广告',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '运营',
                    type: 'bar',
                    stack: '广告',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '项目',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        lineStyle: {
                            type: 'dashed'
                        },
                        data: [
                            [{type: 'min'}, {type: 'max'}]
                        ]
                    }
                },
                {
                    name: '其他',
                    type: 'bar',
                    stack: '搜索引擎',
                    data: [62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };
        const chartsLeft = echarts.init(document.getElementById('chartsLeft'));
        chartsLeft.setOption(option)
    }
    const initChartsRight = () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                data: ['测试', '开发', '产品', '运营','项目','其他']
            },
            series: [
                {
                    name: '测试',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    label: {
                        position: 'inner'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '软件测试', selected: true},
                        {value: 679, name: '硬件测试'},
                        {value: 1548, name: '功能测试'}
                    ]
                },
                {
                    name: '开发',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    },
                    data: [
                        {value: 335, name: '测试'},
                        {value: 310, name: '开发'},
                        {value: 234, name: '产品'},
                        {value: 135, name: '运营'},
                        {value: 1048, name: '项目'},
                        {value: 102, name: '其他'}
                    ]
                }
            ]
        };
        const myChartRight = echarts.init(document.getElementById('chartRight'));
        myChartRight.setOption(option)
    }
    return (
        <div className='home'>
            <Alert
                message="首页数据是静态数据"
                type="warning"
                banner
            />
            <div className='home-content'>
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
                <Row className="charts">
                    <Col span={12}>
                        <p>标签总数</p>
                        <div id='chartsLeft'></div>
                    </Col>
                    <Col span={12}>
                        <p>文章总数</p>
                        <div id='chartRight'></div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Home;