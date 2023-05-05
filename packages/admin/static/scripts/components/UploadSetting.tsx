import { useState } from "react";
import { useForm } from "../useForm";
import { useSelect } from "../useSelect";
import { searchBucketsByKeyword } from "../sdks/searchBucketsByKeyword";
import { searchFileExtByKeyword } from "../sdks/searchFileExtByKeyword";
import * as React from 'react'
import { Form, Input, Select, Button, Space } from 'antd'
export interface IUploadItem {
    title: string;
    desc: string;
    bucket: string;
    limit: number;
    exts: string[];
}
export interface ISettingsUpload {
    [type: string]: IUploadItem;
}
export interface ISettings {
    upload: ISettingsUpload;
}
export const UploadSetting = ({ key }: { key: string }) => {
    const { formProps, setSpan } = useForm<IUploadItem>({
        span: 4,
        get: async () => {
            return {} as any;
        },
        save: async (values: IUploadItem) => {
            setLoading(true)
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => resolve(), 1000)
            })
            setLoading(false)
        }
    });
    const [loading, setLoading] = useState<boolean>(false)
    const { selectProps: bucketSelectProps } = useSelect({ onSearch: searchBucketsByKeyword });
    const { selectProps: fileExtsSelectProps } = useSelect({ multi: true, onSearch: searchFileExtByKeyword })
    return <Form {...formProps}>
        <Form.Item label="代号" labelAlign={'right'} rules={[{ required: true, message: '请输入代号!' }]} help={<p>此名称唯一，不能重复，建议使用英文或拼音</p>} name={'title'}>
            <Input placeholder='请输入代号' />
        </Form.Item>
        <Form.Item label="简介" labelAlign={'right'} help={<p>起到备忘作用</p>} name={'desc'}>
            <Input.TextArea placeholder='请输入简介' />
        </Form.Item>
        <Form.Item label="存储" labelAlign={'right'} rules={[{ required: true, message: '请选择存储位置!' }]} help={<p>请选择S3存储位置,如果没有您要选择的，可以点击<a>添加存储</a></p>} name={'bucket'}>
            <Select {...bucketSelectProps} placeholder="请选择存储位置" />
        </Form.Item>
        <Form.Item label="最大" labelAlign={'right'} rules={[{ required: true, message: '请输入最大文件大小!' }]} help={<p>请输入文件大小限制，单位为Mb，1G=1024MB</p>} name={'limit'}>
            <Input type={'number'} placeholder='请输入最大文件大小' max={100} addonAfter={<span>M</span>} />
        </Form.Item>
        <Form.Item label="后缀名" rules={[{ required: true, message: '请选择允许上传后缀名!' }]} help={<p>请选择后缀名，如果没有您要选择的，您可以点击<a>添加后缀名</a></p>} labelAlign={'right'} name={'exts'}>
            <Select {...fileExtsSelectProps} placeholder={'请选择允许上传后缀名'} />
        </Form.Item>
        <Form.Item >
            <Space>
                <Button htmlType="submit" type="primary" loading={loading}>提交</Button>
                <Button htmlType="reset" >重置</Button>
            </Space>
        </Form.Item>
    </Form>
}
