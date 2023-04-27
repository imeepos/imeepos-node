import { createLogger, Logger as WinstonLogger, format, transports } from 'winston'
import * as Transport from 'winston-transport';
import assert from 'assert';
import { MongoTransport } from './transports/mongo.transport';
export abstract class BaseLogger {
    log: WinstonLogger;
    filename!: string;
    root: string;
    constructor(public label: string) {
        this.root = process.cwd()
        const date = new Date()
        const filename = `attachments/logs/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}.log`;
        this.filename = filename;
        const node_env = process.env.NODE_ENV || 'test';
        const level = process.env.LOGGER_LEVEL || 'info';
        const useFile = !!process.env.LOGGER_USE_FILE;
        const _transports: Transport[] = []
        if (useFile) {
            _transports.push(
                new transports.File({
                    filename,
                    level,
                })
            )
        }
        const useMongo = !!process.env.LOGGER_USE_MONGO;
        if (useMongo && node_env !== 'test') {
            _transports.push(new MongoTransport({
                level
            }))
        }
        assert(_transports.length > 0, `请开启日志存储插件，配置 LOGGER_USE_MONGO = 1 或者 LOGGER_USE_FILE = 1`)
        this.log = createLogger({
            format: format.combine(
                format.timestamp(),
                format.json(),
                format.printf((info) => {
                    return this.toString(info)
                })
            ),
            transports: [..._transports, new transports.Console()]
        })
    }
    toString(info: any) {
        return `${info.timestamp} ${info.level}[${this.label}] ${info.message}`
    }
    info(msg: string) {
        this.log.info(this.createMsg(msg))
    }

    error(msg: string | Error) {
        if (msg instanceof Error) {
            this.log.error({
                pid: process.pid,
                stack: msg.stack,
                label: this.label,
                siteid: process.env.SITE_ID || 0,
                nodeid: process.env.NODE_ID || 0,
                message: msg,
                ...this.createAttr()
            })
        } else {
            this.log.error(this.createMsg(msg))
        }
    }

    warn(msg: string) {
        this.log.warn(this.createMsg(msg))
    }

    debug(msg: string) {
        this.log.debug(this.createMsg(msg))
    }

    private createMsg(msg: string) {
        if (typeof msg === 'object') {
            msg = JSON.stringify(msg)
        }
        const err = new Error(msg)
        const stack = (err.stack || '').split('\n')
        const test = /at.*?\((.*?)\)/
        let line = stack[3].trim();
        const testMatch = line.match(test)
        if (testMatch && testMatch.length > 1) {
            line = testMatch[1].replace(this.root, '')
        } else {
            line = line.trim().replace(this.root, '')
        }
        const attr = {
            pid: process.pid,
            stack: line,
            label: this.label,
            siteid: process.env.SITE_ID || 0,
            nodeid: process.env.NODE_ID || 0,
            message: msg,
            ...this.createAttr()
        }
        return attr
    }

    abstract createAttr(): object;
}