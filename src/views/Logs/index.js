/*
 * @Author: XuYang 
 * @Date: 2020-11-20 10:04:45 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:09:47
 * 日志相关
 * 日志列表/ 导出日志
 */
import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Table, Pagination, Input, message, DatePicker, Space } from 'antd'
import moment from 'moment'
import {
    DeleteOutlined,
    SearchOutlined,
    DownloadOutlined
} from '@ant-design/icons'
import {
    getAllLogs
} from '../../api/logs'
import {
    baseURL
} from '../../utils/config.js'
import { getCookie } from '../../utils/index'
import './index.scss'

const FormItem = Form.Item;

const Logs = () => {
    const initLogList = {
        list: [],
        page: 1,
        pageSize: 10,
        totalRecord: 0
    }
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); //是否加载中
    const [logList, setLogsList] = useState(initLogList); // 用户信息
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);// table选中
    useEffect(()=>{
        getLogsList();
    }, [])

    /**
     * 表单布局
     */
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 }
        }
    };
    /**
     * 获取用户列表
     */
    const getLogsList = async (page, pageSize) => {
        setLoading(true);
        const params = form.getFieldsValue();
        params.page = page || logList.page;
        params.pageSize = pageSize || logList.pageSize;
        if(params.time != null){
            params.startTime = params.time[0].format("YYYY-MM-DD hh:mm:ss")
            params.endTime = params.time[1].format("YYYY-MM-DD hh:mm:ss")
            delete params.time;
        }
        const res = await getAllLogs(params);
        if(res.code === 1){
            setLogsList(res.data)
        }else {
            message.error(res.msg)
        }
        setLoading(false);
    }
    /**
     * 重置
     */
    const resetHandle = () => {
        form.resetFields();
    }
    /**
     * 查询
     */
    const searchHandle = () => {
        getLogsList(1, logList.pageSize);
    }
    /**
     * 翻页信息
     */
    const onShowSizeChange = (page, pageSize) => {
        getLogsList(page, pageSize);
    }
    /**
     * 导出所有
     */
    const exportAll = () => {
       window.open(
           `${baseURL()}/admin/logs/exportAll?token=${getCookie("token")}`
       )
    }
    /**
     * 导出选中
     */
    const exportSelected = () =>{
        window.open(
            `${baseURL()}/admin/logs/exportSelected?ids=${selectedRowKeys}&token=${getCookie("token")}`
        )
    }
    /**
     * 用户列表 列数据
     */
    const columns = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '操作人',
            align: 'center',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: '详情',
            align: 'left',
            key: 'detail',
            dataIndex: 'detail',
        },
        {
            title: '创建时间',
            align: 'center',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (txt) => {
                if(txt !== null){
                    return moment(txt).format('YYYY-MM-DD hh:mm:ss');
                }
                return '';
            }
        }
    ]
    // table选中
    const rowSelection ={
        selectedRowKeys,
        onChange: (selectedRowKeys)=> setSelectedRowKeys(selectedRowKeys)
    }
    return (
        <div className='tableMain'>
            <div className='search-top'>
                <h1>日志管理</h1>
                <div className='search-panel'>
                    <Form form={form}>
                        <Row gutter={24}>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='操作人：'
                                    name='username'
                                >
                                    <Input placeholder='操作人' />
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="时间区间:"
                                    name="time"
                                >
                                    <DatePicker.RangePicker style={{width: '100%'}} placeholder={['开始时间', '结束时间']}></DatePicker.RangePicker>   
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <Space>
                                    <Button onClick={resetHandle} icon={<DeleteOutlined />}>清空</Button>
                                    <Button type='primary' icon={<SearchOutlined />} onClick={searchHandle}>查询</Button>
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Space>
                                    <Button icon={<DownloadOutlined />} onClick={exportAll}>导出全部</Button>
                                    <Button icon={<DownloadOutlined />} onClick={exportSelected}>导出选中</Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className='search-result'>
                <Table
                    rowSelection={rowSelection}
                    rowKey='id'
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={logList.list}
                    style={{ minWidth: '960px' }}
                    locale={
                    {
                        emptyText: '暂无数据'
                    }
                    }
                    pagination={false}
                />
                <div className='page-main'>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={logList.page}
                        pageSize={logList.pageSize}
                        total={logList.totalRecord}
                        onShowSizeChange={onShowSizeChange}
                        onChange={onShowSizeChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Logs;