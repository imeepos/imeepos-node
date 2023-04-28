import { BaseLogger } from './base';
export class RequestLogger extends BaseLogger {
    createAttr(): object {
        return { reqid: this.reqid }
    }
    constructor(label: string, public reqid: string) {
        super(label)
    }
}
export class SystemLogger extends BaseLogger {
    createAttr(): object {
        return {}
    }
    constructor() {
        super('system')
    }
}
export class MethodLogger extends BaseLogger {
    createAttr(): object {
        return {
            class: this.name,
            property: this.property,
            args: this.args
        }
    }
    constructor(public name: string, public property: string, private args: any[]) {
        super(`method`)
    }
    toString(info: any): string {
        return `${info.timestamp} ${info.level}[${this.label}] ${info.class}.${info.property}(${info.args.join(',')}) => ${info.message}`
    }
}
export class MethodDecoratorLogger extends BaseLogger{
    createAttr(): object {
        return {
            class: this.name,
            property: this.property
        }
    }
    constructor(public name: string, public property: string) {
        super(`method`)
    }
    toString(info: any): string {
        return `${info.timestamp} ${info.level}[${this.label}] ${info.class}.${info.property} ${info.message}`
    }
}