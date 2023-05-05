

import * as React from 'react';
import { render } from './components/utils';
import { Tabs } from 'antd'
import { useSettingsTabs, useUploadSettingsTabs } from './useTabs';
import { UploadSetting } from './components/UploadSetting';
export const Settings = () => {
    const { tabsProps } = useSettingsTabs()
    const { tabsProps: uploadTabs } = useUploadSettingsTabs()
    return <div className="page settings-page">
        <Tabs {...tabsProps}>
            <Tabs.TabPane tab="上传配置" key="upload">
                <Tabs {...uploadTabs}>
                    <Tabs.TabPane tab="头像" key='upload.avatar'>
                        <UploadSetting key="upload.avatar"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="缩略图" key='upload.cover'>
                        <UploadSetting key="upload.cover"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="图标" key='upload.icon'>
                        <UploadSetting key="upload.icon"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="音频" key='upload.audio'>
                        <UploadSetting key="upload.audio"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="视频" key='upload.video'>
                        <UploadSetting key="upload.video"/>
                    </Tabs.TabPane>
                </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="版权配置" key="copyright" tabKey={'copyright'}>copyright</Tabs.TabPane>
        </Tabs>
    </div>
}

render(<Settings />)
