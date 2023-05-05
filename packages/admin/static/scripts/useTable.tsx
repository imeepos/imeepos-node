
import { TableProps, Button } from 'antd'
import { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/es/table'
import { get, post } from './util';
import * as React from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
export const ButtonIcon: { [key: string]: React.ReactElement } = {
    canEdit: <EditOutlined />,
    canDelete: <DeleteOutlined />,
    canView: <EyeOutlined />,
    canCreate: <PlusOutlined />
}
export interface UserTableOptions {
    source: string;
    search?: string;
    config?: string;
}
export function useTable<T extends object>(options: UserTableOptions) {
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [psize, setPSize] = useState<number>(20)
    const [total, setTotal] = useState<number>(0)
    const [dataSource, setDataSource] = useState<T[]>([])
    const [tableProps, setTableProps] = useState<TableProps<T>>({})
    const [columns, setColumns] = useState<ColumnProps<T>[]>([])
    const [rights, setRights] = useState<{ [key: string]: boolean }>({})

    const onSearch = async () => {
        setLoading(true)
        const { list, total } = await post(options.search || '/@imeepos/admin/v1/search', {
            source: options.source,
            page,
            psize
        })
        setLoading(false)
        setDataSource(list)
        setTotal(total)
    }
    const buttons = [{
        render: (_, record) => {
            return <>
                {Object.keys(rights || {}).map(key => {
                    const right = Reflect.get(rights, key)
                    if (right) {
                        return <Button data-action={key} icon={ButtonIcon[key]} />
                    }
                    return null;
                })}
            </>
        }
    }] as ColumnProps<T>[]
    const getTableProps = () => {
        get(options.config || '/@imeepos/admin/v1/getSourceTableConfig', { source: options.source }).then(res => {
            const { _id, columns, rights, ...props } = res;
            setTableProps({
                ...tableProps,
                ...props,
            })
            setRights(rights)
            setColumns(columns || [])
        })
    }
    useEffect(() => {
        getTableProps()
        onSearch()
    }, [])
    return {
        tableProps: {
            ...tableProps,
            dataSource,
            loading,
            pagination: {
                current: page,
                pageSize: psize,
                total: total,
                showQuickJumper: true,
                showSizeChanger: true,
                showTitle: true,
            },
            onChange: (pagination, filters, sorter, extra) => {
                const { current, pageSize } = pagination;
                current && setPage(current)
                pageSize && setPSize(pageSize)
                onSearch()
            },
        } as TableProps<T>,
        columns: [
            ...columns,
            ...buttons
        ]
    }
}
