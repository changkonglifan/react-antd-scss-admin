/*
 * @Author: XuYang 
 * @Date: 2020-11-20 10:04:45 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:09:32
 * 用户管理 
 * 新增/修改/删除/重置密码/用户列表
 */
import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Table, Pagination, Input, Select, Tag, Modal, message, Space, Popconfirm } from 'antd'
import { sexs, userStatus, roles } from '../../utils/enums';
import moment from 'moment'
import {
    UserAddOutlined,
    DeleteOutlined,
    SearchOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import {
    getAllUser,
    addUser,
    modifyUser,
    deleteUser,
    resetPsw
} from '../../api/user'
import './index.scss'
import AddModal from './AddModal';

const FormItem = Form.Item;
const Option = Select.Option;

const UserManager = () => {
    const initUserList = {
        list: [],
        page: 1,
        pageSize: 10,
        totalRecord: 0
    }
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); //是否加载中
    const [isAdd, setIsAdd] = useState(false); //是否新增
    const [isVisible, setIsVisible] = useState(false); //是否显示弹窗
    const [userList, setUserList] = useState(initUserList); // 用户信息
    const [currentRecord, setCurrentRecord] = useState({}); // 当前选项
    const [modalLoading, setModalLoading] = useState(false); //弹窗是否加载中
    useEffect(()=>{
        getUserList();
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
    const getUserList = async (page, pageSize) => {
        setLoading(true);
        const params = form.getFieldsValue();
        params.page = page || userList.page;
        params.pageSize = pageSize || userList.pageSize;
        const res = await getAllUser(params);
        if(res.code === 1){
            setUserList(res.data)
        }else {
            message.error(res.msg)
        }
        setLoading(false);
    }
    /**
     * 修改
     * @param {*} record 
     */
    const modifyHandle = (record) => {
        setCurrentRecord(record);
        setIsAdd(false);
        setIsVisible(true);
    }
    /**
     * 删除
     */
    const deleteHandle = (record) =>{
        Modal.confirm({
            title: `确定删除用户${record.name}?`,
            icon: <ExclamationCircleOutlined />,
            content: `删除后当前用户不可用`,
            okText:'删除',
            okType:'danger',
            cancelText: '取消',
            onOk() {
                setCurrentRecord(record);
                onDelete();
            },
            onCancel() {
            },
        })
    }
    /**
     * 重置密码
     * @param {*} record 
     */
    const resetPassword = async (record) => {
        const params = {
            uuid: record.uuid
        }
        const res = await resetPsw(params)
        if(res.code === 1){
            message.success("重置成功");
        }else {
            message.error(res.msg)
        }
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
        getUserList(1, userList.pageSize);
    }
    /**
     * 点击新增用户
     */
    const addUserHandle = () =>{
        setIsAdd(true);
        setIsVisible(true)
    }
    /**
     * 翻页信息
     */
    const onShowSizeChange = (page, pageSize) => {
        getUserList(page, pageSize);
    }
    /**
     * 确认按钮
     */
    const handleOk = async (data) => {
        // setIsVisible(false)
        setModalLoading(true);
        const params = {...data};
        if(isAdd){
            add(params)
        }else {
            params.uuid = currentRecord.uuid;
            modify(params);
        }

    }
    /**
     * 新增用户
     * @param {*} params 
     */
    const add = async (params) => {
        const res = await addUser(params)
        if(res.code === 1){
            message.success('新增成功');
            getUserList(1, userList.pageSize);
            setIsVisible(false);
        }else{
            message.error(res.msg)
        }
        setModalLoading(false);
    }
    /**
     * 修改用户
     * @param {*} params 
     */
    const modify = async (params) => {
        const res = await modifyUser(params);
        if(res.code === 1){
            message.success('修改成功');
            getUserList();
            setIsVisible(false);
        }else{
            message.error(res.msg)
        }
        setModalLoading(false);
    }
    /**
     * 删除用户
     */
    const onDelete = async () =>{
        const params = {
            uuid: currentRecord.uuid
        }
        const res = await deleteUser(params)
        if(res.code === 1){
            message.success('删除成功');
            getUserList(1, userList.pageSize);
        }else{
            message.error(res.msg)
        }
    }
    /**
     * 取消按钮
     */
    const handleCancel = () => {
        setIsVisible(false)
    }

    /**
     * 用户列表 列数据
     */
    const columns = [
        {
            title: '用户名',
            width: 120,
            align: 'center',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '昵称',
            width: 120,
            align: 'center',
            dataIndex: 'nickName',
            key: 'nickName'
        },
        {
            title: '真实姓名',
            width: 160,
            align: 'center',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '性别',
            width: 80,
            align: 'center',
            key: 'sex',
            dataIndex: 'sex',
            render:(txt) => sexs[txt] ? sexs[txt] : '未知'
        },
        {
            title: '角色',
            width: 80,
            align: 'center',
            key: 'auth_name',
            dataIndex: 'auth_name',
            render:(txt) => roles[txt] ? roles[txt] : '未知'
        },
        {
            title: '手机',
            align: 'center',
            key: 'mobile',
            dataIndex: 'mobile'
        },
        {
            title: '头像',
            width: 100,
            align: 'center',
            key: 'avatar',
            dataIndex: 'avatar',
            render: (txt) => <img width={30} height={30} src={txt}></img>
        },
        {
            title: '用户状态',
            align: 'center',
            key: 'isDel',
            dataIndex: 'isDel',
            render:(txt) => {
                const t = userStatus[txt] ? userStatus[txt] : '停用';
                return <Tag className='user-tag' color={txt + '' === '0' ? 'green' : 'red'}>{t}</Tag>;
            }
        },
        {
            title: '简介',
            width: 120,
            align: 'center',
            key: 'introduction',
            dataIndex: 'introduction'
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
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            key: 'action',
            render(txt, record) {
                return <Space>
                            <a href='#!' onClick={()=>modifyHandle(record)}>修改</a>
                            <Popconfirm placement="topLeft" title="确认重置密码？" onConfirm={()=>resetPassword(record)} okText="确认" cancelText="取消">
                                <a href='#!'>重置密码</a>
                            </Popconfirm>
                            <a href='#!' onClick={()=>deleteHandle(record)} color='red'>删除</a>
                        </Space>
            },
        }
    ]
    return (
        <div className='tableMain'>
            <div className='search-top'>
                <h1>用户管理</h1>
                <div className='search-panel'>
                    <Form form={form}>
                        <Row gutter={24}>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='姓名：'
                                    name='name'
                                >
                                    <Input placeholder='真实姓名' />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='用户名：'
                                    name='username'
                                >
                                    <Input placeholder='用户名' />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='手机号: '
                                    name='mobile'
                                >
                                    <Input placeholder='手机号' />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='类型: '
                                    name='authName'
                                >
                                    <Select placeholder='账号类型'>
                                        <Option key='0' value='0'>超级管理员</Option>
                                        <Option key='1' value='1'>管理员</Option>
                                        <Option key='2' value='2'>成员</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label='状态：'
                                    name='isDel'
                                    initialValue='0'
                                >
                                    <Select placeholder='用户状态'>
                                        <Option key='0' value='0'>正常</Option>
                                        <Option key='1' value='1'>停用</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <Space>
                                    <Button onClick={resetHandle} icon={<DeleteOutlined />}>清空</Button>
                                    <Button type='primary' icon={<SearchOutlined />} onClick={searchHandle}>查询</Button>
                                </Space>
                            </Col>
                        </Row>
                        <Button icon={<UserAddOutlined />} type='primary' onClick={addUserHandle}>新增用户</Button>
                    </Form>
                </div>
            </div>
            <div className='search-result'>
                <Table
                    rowKey='uuid'
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={userList.list}
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
                        current={userList.page}
                        pageSize={userList.pageSize}
                        total={userList.totalRecord}
                        onShowSizeChange={onShowSizeChange}
                        onChange={onShowSizeChange}
                    />
                </div>
            </div>
            {
                isVisible && 
                <AddModal 
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    isVisible={isVisible}
                    isAdd={isAdd}
                    currentRecord={currentRecord}
                    roles={roles}
                    loading={modalLoading}
                ></AddModal>
            }
        </div>
    )
}

export default UserManager;