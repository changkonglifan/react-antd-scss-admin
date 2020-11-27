/*
 * @Author: XuYang 
 * @Date: 2020-11-26 13:51:03 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-27 18:23:32
 * 标签管理
 */
import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Tree, Form, Button, Input, Space, message, Modal } from 'antd';
import immutable from 'immutable';
import {
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons'
import {
    getAllTags,
    addTag,
    updateTag,
    deleteTag
} from '../../api/tags'
import './index.scss'

const Item = Form.Item;
const { List } = immutable;

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

const Tags = () => {
    const [form] = Form.useForm();
    const [treeData, setTreeData] = useState(List([])); // 树形结构数据
    const [isAdd,setIsAdd] = useState(false); //添加
    const [parent, setParent] = useState(null); //根结点
    const [currentNode, setCurrentNode] = useState({}); // 当前选中节点,每次只能选中一个 
    useEffect(()=>{
        getAllTagsTreeData();
    }, [])
    /**
     * 获取所有的标签
     * 树形结构
     */
    const getAllTagsTreeData = async () => {
        const res = await getAllTags();
        if(res.code === 1){
            setTreeData(List([...res.data.treeList]));
        }else {
            message.error(res.msg);
        }
    }
    /**
     * 树形结构
     */
    const treeSelect = (selectedKeys, info) => {
        if(selectedKeys.length > 0) {
            setIsAdd(false);
            setCurrentNode(info.node);
            setFormData(info.node.data)
        }
    }
    /**
     * 添加根标签
     */
    const addRoot = () => {
        setIsAdd(true)
        setParent(null);
        setFormData(null);
        form.setFieldsValue({
            parentName: '根节点'
        })
    }
    /**
     * 设置form数据
     */
    const setFormData = (data) =>{
        if(data === null){
            form.resetFields();
        }else {
            form.setFieldsValue({
                parentName: data.parentName == null ? '根标签' : data.parentName,
                name: data.name,
                description: data.description
            })
        }
    }
    /**
     * 确定按钮 
     */
    const onSure = () => {
        form.validateFields().then((values)=>{
            // 提交
            if(isAdd){
                addNode(values);
            }else {
                updateNode(values);
            }
        }).catch((err)=>{

        })
    }
    /**
     * 添加节点
     */
    const addNode = async (formValues) => {
        const params = {
            pid: parent ? parent.id : "0",
            name:  formValues.name,
            description: formValues.description
        }
        const res = await addTag(params);
        if(res.code === 1){
            message.success('添加成功');
            getAllTagsTreeData();
        }else{
            message.error(res.msg);
        }
    }
    /**
     * 更新节点
     */
    const updateNode = async (formValues) => {
        const params = {
            id: currentNode.data.id,
            name: formValues.name,
            description: formValues.description
        }
        const res = await updateTag(params);
        if(res.code === 1){
            message.success('修改成功');
            getAllTagsTreeData();
        }else {
            message.error(res.msg);
        }
    }
    /**
     * 添加子节点
     */
    const addChildNode = (e,  item) => {
        setParent(item);
        form.setFieldsValue({
            parentName: item.name,
            name: '',
            description: ''
        })
        setIsAdd(true);
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * 删除节点
     */
    const deleteNode = (e, item) => {
        console.log(item)
        Modal.confirm({
            title:'删除',
            content:`确定删除节点 <${item.name}>`,
            cancelText:'取消',
            okText:'删除',
            okType:'danger',
            async onOk(){
                const res = await deleteTag({id: item.id});
                if(res.code === 1){
                    message.success('删除成功');
                    getAllTagsTreeData();
                }else {
                    message.error(res.msg);
                }
            },
            onCancel(){

            }
        })
        e.preventDefault();
        e.stopPropagation();
    }
    /**
     * 循环生成树节点
     * @param {*} data 
     */
    const loop = (data) => {
        return data.map((item)=>{
            if(item.children.length > 0 ){
                return {title: <Space>
                                <span>{item.name}</span>
                                <a href='#!' onClick={(e)=>addChildNode(e, item)}><PlusCircleOutlined /></a>
                                <a href='#!' onClick={(e)=>deleteNode(e, item)}><MinusCircleOutlined /></a>
                            </Space>, key:item.id,children: loop(item.children), isLeaf: false, count: item.count, data:item};
            }
            return {title: <Space>
                                <span>{item.name}</span>
                                <a href='#!' onClick={(e)=>addChildNode(e, item)}><PlusCircleOutlined /></a>
                                <a href='#!' onClick={(e)=>deleteNode(e, item)}><MinusCircleOutlined /></a>
                            </Space>, key: item.id, children: [], isLeaf:  true, count: item.count,  data:item}
        })
    }
    return (
        <div className='tag-main'>
            <h1>标签列表</h1>
            <div className="tag-content">
                <Layout>
                    <Row>
                        {/* 左侧树形结构 */}
                        <Col span={8}>
                            <div className='header-btn'>
                                <Button type='primary' onClick={addRoot}><PlusCircleOutlined />添加根标签</Button>
                            </div>
                            <Tree
                                treeData={loop(treeData)}
                                onSelect={treeSelect}
                            >
                            </Tree>
                        </Col>
                        {/* 右侧内容页 */}
                        <Col span={16}>
                            <Form form={form} {...formItemLayout}>
                                <Item
                                    label='父标签'
                                    name='parentName'
                                >
                                    <Input placeholder="请输入父标签" disabled={true}></Input>
                                </Item>
                                <Item
                                    label='标签名称'
                                    name='name'
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: '名称不能为空'
                                            }
                                        ]
                                    }
                                >
                                    <Input placeholder="请输入标签名称"></Input>
                                </Item>
                                <Item
                                    label='描述'
                                    name='description'
                                >
                                    <Input.TextArea rows={3} placeholder="请输入描述"></Input.TextArea>
                                </Item>
                                <Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <Space>
                                        <Button>取消</Button>
                                        <Button type='primary' onClick={onSure}>确定</Button>
                                    </Space>
                                </Item>
                            </Form>
                        </Col>
                    </Row>
                </Layout>
            </div>
        </div>
    )
}

export default Tags;