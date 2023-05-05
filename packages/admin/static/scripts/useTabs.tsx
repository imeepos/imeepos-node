import { TabsProps } from 'antd'
export function useSettingsTabs() {
    const tabsProps: TabsProps = {
        tabBarGutter: 12,
        tabPosition: 'left',
        type: 'line',
        hideAdd: false,
        tabBarExtraContent: {}
    }
    return { tabsProps }
}

export function useUploadSettingsTabs() {
    const tabsProps: TabsProps = {
        tabBarGutter: 12,
        tabPosition: 'top',
        type: 'line',
        hideAdd: false,
        tabBarExtraContent: {}
    }
    return { tabsProps }
}