import { SystemLogger, Log } from '@imeepos/logger'
import { existsSync } from 'fs-extra'
export class TestLog {
    @Log()
    add(a: number, b: number) {
        return a + b;
    }
}
describe('测试@imeepos/logger', () => {
    let logger: SystemLogger;
    beforeEach(() => {
        logger = new SystemLogger()
    })
    it('测试info', () => {
        logger.info(`hello world`)
        const isExisits = existsSync(logger.filename)
        expect(isExisits).toEqual(true)
    })
    it('测试装饰器Log', () => {
        const log = new TestLog()
        const res = log.add(1, 2)
        expect(res).toEqual(3)
    })
})