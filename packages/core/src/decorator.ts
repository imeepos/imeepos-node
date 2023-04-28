import { Schema, model } from 'mongoose'
import { MethodDecoratorLogger } from '@imeepos/logger'
const RouterSchema = new Schema({
    path: String,
    title: String,
    description: String,
    keywords: String,
    version: String,
    method: String,
    module: String,
    status: Number
})
export const RouterModel = model('router', RouterSchema)
export async function saveRouter(router: any) {
    const { path, module, version, ...udpate } = router;
    const item = await RouterModel.findOne({ path, module, version })
    if (item) {
        await RouterModel.updateOne({ path, module, version }, { ...udpate, status: 1 })
    } else {
        await new RouterModel({ ...router, status: 1 }).save()
    }
}
export interface RouterOptions {
    path?: string,
    title?: string,
    keywords?: string,
    description?: string
}
export class ModuleDecorator {
    static router: Map<string, Function> = new Map();
    static html: Set<any> = new Set()
    constructor(public name: string, public version: string) { }
    private createMethod(method: string) {
        return (options: RouterOptions): MethodDecorator => {
            let routerKey = `${method.toUpperCase()}:/${this.name}/${this.version}`
            if (options.path) {
                routerKey += options.path.startsWith('/') ? options.path : `/${options.path}`
            }
            process.nextTick(() => {
                saveRouter({
                    ...options,
                    path: options.path || '',
                    method: method.toUpperCase(),
                    module: this.name,
                    version: this.version
                }).catch(e => undefined)
            })
            return (target, key, descriptor) => {
                const method = Reflect.get(target, key)
                const logger = new MethodDecoratorLogger(target.constructor.name, key as string)
                if (ModuleDecorator.router.has(routerKey)) {
                    logger.error(`${routerKey}已经被使用，请换个名字`)
                } else {
                    ModuleDecorator.router.set(routerKey, method.bind(target))
                }
            }
        }
    }
    get(options: RouterOptions): MethodDecorator {
        return this.createMethod('get')(options)
    }

    post(options: RouterOptions): MethodDecorator {
        return this.createMethod('post')(options)
    }

    delete(options: RouterOptions): MethodDecorator {
        return this.createMethod('delete')(options)
    }

    put(options: RouterOptions): MethodDecorator {
        return this.createMethod('put')(options)
    }

    html(root: string, html: string, meta: any): PropertyDecorator {
        const opts = {
            name: this.name,
            meta,
            template: html,
            root
        }
        ModuleDecorator.html.add(opts)
        process.nextTick(() => {
            saveRouter({
                ...meta,
                path: html || '',
                method: 'GET',
                module: this.name,
                version: this.version
            }).catch(e => undefined)
        })
        return (target, key) => { }
    }
}
export function createModuleDecorator(name: string, version: string = 'v1') {
    return new ModuleDecorator(name, version)
}