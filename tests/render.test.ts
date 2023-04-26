import { render } from '@imeepos/render';
import { join } from 'path';

describe('测试render正则表达式', () => {
  it('提取script', async () => {
    const html = await render('index.html', { meta: { title: 'PM2管理', keywords: 'pm2,管理', description: '一个管理pm2的工具页面' }, root: join(__dirname, '../packages/pm2/static'), name: '@imeepos/pm2' })
    expect(html).toEqual(join(__dirname, '../attachments/@imeepos/pm2/index.html'))
  })
})