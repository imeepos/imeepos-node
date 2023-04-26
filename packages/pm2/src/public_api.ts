import pm2 from 'pm2'
export type Platform = 'ubuntu' | 'centos' | 'redhat' | 'gentoo' | 'systemd' | 'darwin' | 'amazon';
export class Pm2Service {
    connect() {
        return new Promise<void>((resolve, reject) => {
            pm2.connect((err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
    disconnect() {
        pm2.disconnect()
    }
    kill(): Promise<pm2.ProcessDescription> {
        return new Promise((resolve, reject) => {
            pm2.killDaemon((err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    describe(process: string | number) {
        return new Promise((resolve, reject) => {
            pm2.describe(process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    flush(process: number | string) {
        return new Promise((resolve, reject) => {
            pm2.flush(process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    sendSignal(signal: string | number, process: number | string) {
        return new Promise((resolve, reject) => {
            pm2.sendSignalToProcessName(signal, process, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    startup(platform: Platform) {
        return new Promise((resolve, reject) => {
            pm2.startup(platform, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    sendData(proc_id: number, packet: object) {
        return new Promise((resolve, reject) => {
            pm2.sendDataToProcessId(proc_id, packet, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
    async list(): Promise<pm2.ProcessDescription[]> {
        const list = await new Promise<pm2.ProcessDescription[]>((resolve, reject) => {
            pm2.list((err, list) => {
                if (err) return reject(err)
                resolve(list)
            })
        })
        return list;
    }
    async start(options: pm2.StartOptions): Promise<pm2.Proc> {
        return new Promise((resolve, reject) => {
            pm2.start(options, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
    stop(process: string | number): Promise<pm2.Proc> {
        return new Promise((resolve, reject) => {
            pm2.stop(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    restart(process: string | number): Promise<pm2.Proc> {
        return new Promise((resolve, reject) => {
            pm2.restart(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    del(process: string | number): Promise<pm2.Proc> {
        return new Promise((resolve, reject) => {
            pm2.delete(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }

    reload(process: string | number): Promise<pm2.Proc> {
        return new Promise((resolve, reject) => {
            pm2.reload(process, (err, proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
}