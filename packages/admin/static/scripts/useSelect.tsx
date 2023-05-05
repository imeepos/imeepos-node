import { SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select';
import { useState, useEffect } from 'react'
export interface SelectOptions {
    multi?: boolean;
    onSearch?: (keyword?: string) => Promise<DefaultOptionType[]>;
}
export function useSelect(config: SelectOptions) {
    const [keyword, setKeyword] = useState<string>()
    const [options, setOptions] = useState<DefaultOptionType[]>([])
    useEffect(() => {
        onLoad()
    }, [])
    const onLoad = () => {
        config.onSearch && config.onSearch(keyword).then(options => setOptions(options))
    }
    const onSearch = (value: string) => {
        setKeyword(value)
    }
    const selectProps: SelectProps = {
        allowClear: true,
        showSearch: true,
        options: options,
        onSearch: onSearch
    }
    if (!!config.multi) {
        selectProps.mode = 'multiple'
    }
    return {
        selectProps
    }
}