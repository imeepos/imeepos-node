import { killDaemon, describe, flush, sendSignalToProcessName, startup, sendDataToProcessId, start, StartOptions, Proc, stop, restart, delete as del, reload, list, ProcessDescription } from 'pm2'
export type Platform = 'ubuntu' | 'centos' | 'redhat' | 'gentoo' | 'systemd' | 'darwin' | 'amazon';
export class Pm2Service {
    kill(): Promise<ProcessDescription> {
        return new Promise((resolve, reject) => {
            killDaemon((err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    describe(process: string | number) {
        return new Promise((resolve, reject) => {
            describe(process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    flush(process: number | string) {
        return new Promise((resolve, reject) => {
            flush(process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    sendSignal(signal: string | number, process: number | string) {
        return new Promise((resolve, reject) => {
            sendSignalToProcessName(signal, process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    startup(platform: Platform) {
        return new Promise((resolve, reject) => {
            startup(platform, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    sendData(proc_id: number, packet: object) {
        return new Promise((resolve, reject) => {
            sendDataToProcessId(proc_id, packet, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    list(): Promise<ProcessDescription[]> {
        return new Promise((resolve, reject) => {
            list((err, list) => {
                if (err) return reject(err)
                resolve(list)
            })
        })
    }
    start(options: StartOptions): Promise<Proc> {
        return new Promise((resolve, reject) => {
            start(options, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
    stop(process: string | number): Promise<Proc> {
        return new Promise((resolve, reject) => {
            stop(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    restart(process: string | number): Promise<Proc> {
        return new Promise((resolve, reject) => {
            restart(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    del(process: string | number): Promise<Proc> {
        return new Promise((resolve, reject) => {
            del(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    reload(process: string | number): Promise<Proc> {
        return new Promise((resolve, reject) => {
            reload(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
}