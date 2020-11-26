/*
 * @Author: XuYang 
 * @Date: 2020-11-26 13:51:03 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 17:41:46
 * 标签管理
 */
import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Tree, Divider, Form, Button, Input, Space, message } from 'antd';
import {
    PlusCircleOutlined
} from '@ant-design/icons'
import {
    getAllTags
} from '../../api/tags'
import './index.scss'
const Item = Form.Item;

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
    const [treeData, setTreeData] = useState([]); // 树形结构数据
    const [isAdd,setIsAdd] = useState(false); //添加
    const [root, setRoot] = useState(null); //根结点
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
            setTreeData(res.data.treeList);
        }else {
            message.error(res.msg);
        }
    }
    /**
     * 树形结构
     */
    const treeSelect = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info);
    }
    /**
     * 添加标签
     */
    const addTag = () => {
        setIsAdd(true)
        setRoot(null);
    }
    return (
        <div className='tag-main'>
            <h1>标签列表</h1>
            <div className="tag-content">
                <Layout>
                    <Row>
                        {/* 左侧树形结构 */}
                        <Col span={8}>
                            <Button type='primary' onClick={addTag}><PlusCircleOutlined />添加标签</Button>
                            <Tree
                                treeData={treeData}
                                onSelect={treeSelect}
                            >    
                            </Tree>
                        </Col>
                        {/* 右侧内容页 */}
                        <Col span={16}>
                            <Form form={form} {...formItemLayout}>
                                <Item
                                    label='父标签'
                                    name='pid'
                                >
                                    <Input placeholder="请输入父标签" disabled={true}></Input>
                                </Item>
                                <Item
                                    label='标签名称'
                                    name='name'
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
                                        <Button type='primary'>确定</Button>
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