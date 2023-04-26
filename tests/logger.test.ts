import { Logger } from '@imeepos/logger'
import { existsSync } from 'fs-extra'
import { join } from 'path';

describe('测试@imeepos/logger', () => {
    let logger: Logger;
    beforeEach(() => {
        logger = new Logger(join(__dirname, '..'), 'test', '001')
    })
    it('测试info', () => {
        logger.info(`hello world`)
        const isExisits = existsSync(logger.filename)
        expect(isExisits).toEqual(true)
    })
})