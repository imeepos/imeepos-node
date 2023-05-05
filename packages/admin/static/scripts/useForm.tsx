import { FormProps, Form } from "antd";
import { useEffect, useState } from 'react'
export interface FormOptions<T> {
    get?: () => Promise<T>,
    save?: (value: T) => Promise<void>,
    span?: number;
}
export function useForm<T extends object>(options: FormOptions<T>) {
    const [data, setData] = useState<T | null>(null)
    const [span, setSpan] = useState<number>(options.span || 5)
    const [form] = Form.useForm()
    const setFieldValue = () => data && Object.keys(data).map(key => {
        form && form.setFieldValue(key, Reflect.get(data, key))
    });
    const loadData = () => {
        options.get && options.get().then(res => setData(res)).then(() => setFieldValue()).catch(e => {
            setData({} as T)
        })
    }
    useEffect(() => {
        loadData()
    }, [])
    const formProps: FormProps = {
        form,
        autoComplete: 'off',
        onFinish(values) {
            return options.save && options.save(values)
        },
        colon: true,
        labelCol: {span}
    }
    return { formProps, setSpan }
}