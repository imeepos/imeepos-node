import * as React from 'react'
import { render } from './components/utils'
import { Menu, MenuProps, FormProps, Form, Button, Input, Table, Upload } from 'antd'
import { FormInstance } from 'antd/es/form'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { v4 } from 'uuid'
import { useTable } from './useTable';
import { PlusOutlined } from '@ant-design/icons';

export interface MenuItem {
    key: string;
    title?: string;
    label?: string;
    icon?: string;
    disabled: boolean;
}
function useMenu(): [MenuProps] {
    const [items, setItems] = useState<MenuItem[]>([])
    useEffect(() => {
        axios.get('/@imeepos/admin/v1/getMenus').then(res => res.data).then(data => {
            setItems(data.data)
        })
    }, [])
    const props: MenuProps = {
        items
    }
    return [
        props
    ]
}
function useMenuForm(): [FormProps, FormInstance] {
    const [item, setItem] = useState<MenuItem>({ key: v4(), label: undefined, title: undefined, icon: undefined, disabled: true })
    const [form] = Form.useForm()
    Object.keys(item).map(key => {
        form && form.setFieldValue(key, Reflect.get(item, key))
    });
    const formProps: FormProps = {
        form,
        layout: 'inline'
    }
    return [formProps, form]
}

export const Welcome = () => {
    const [menuProps] = useMenu()
    // const [formProps, form] = useMenuForm()
    const { tableProps, columns } = useTable<any>({
        source: 'config_source_tables'
    });

    return <div className="page welcome-page">
        <div className="page-sider">
            <Menu {...menuProps} />
        </div>
        <div className="page-container">
            <div className="page-header">
                {/* <Form {...formProps} >
                    <Form.Item label="key" name="key" required>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="label" name="label" required>
                        <Input placeholder=''/>
                    </Form.Item>
                    <Form.Item label="title" name="title" required>
                        <Input placeholder=''/>
                    </Form.Item>
                    <Form.Item label="icon" name="icon" ></Form.Item>
                    <Form.Item label="disabled" name="disabled" >
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={async () => {
                            const values = await form.validateFields()
                            axios.post('/@imeepos/admin/v1/saveMenuItem', values).then(res => res.data).then(res => {
                                console.log(res)
                            })
                        }}>提交</Button>
                    </Form.Item>
                </Form> */}
                <Upload listType='picture-card' multiple={false} action={'/upload/icon'} onChange={({ file, fileList, event }) => {
                    if (file.status === 'done') {
                        const { response } = file;
                        const data = response.data;
                        Object.keys(data).map(key => {
                            Reflect.set(file, key, Reflect.get(data, key))
                        });
                    }
                }} onRemove={async (file) => {
                    return axios.post('/upload/delete', { url: file.url }).then(res => res.data).then(() => true).catch(e => false)
                }}>
                    <div><PlusOutlined /></div>
                </Upload>
            </div>
            <div className="page-footer">
                <Table {...tableProps}>
                    {columns.map(column => <Table.Column {...column} />)}
                </Table>
            </div>
        </div>
    </div>
}
render(<Welcome />)
