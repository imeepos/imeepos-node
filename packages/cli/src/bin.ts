#!/usr/bin/env node

import { program } from 'commander'

program.name('imeepos').version('1.0.0')

program
    .command('login')
    .description('登录')
    .option('-u, --username [username]', '用户名', '')
    .option('-p, --password [password]', '密码', '').action(({ username, password }) => {
        console.log(`todo login`, { username, password })
    })

program
    .command('init')
    .description('初始化')
    .action(() => {
        console.log(`todo init`)
    })

async function bootstrap() {
    program.parse(process.argv)
}

bootstrap()
