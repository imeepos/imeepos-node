export class WeAccount { }
export class WeUtility { }
export type WePlatform = 'web' | 'mobile'
export type ImageFileType = 'gif' | 'jpg' | 'jpeg' | 'bmp' | 'png' | 'ico';
export function isImageFileType(ext: string): ext is ImageFileType {
    return ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'ico'].includes(ext)
}
export type AudioFileType = 'mp3' | 'wma' | 'wav' | 'amr';
export function isAudioFileType(ext: string): ext is AudioFileType {
    return ['mp3', 'wma', 'wav', 'amr'].includes(ext)
}
export type VideoFileType = 'wmv' | 'avi' | 'mpg' | 'mpeg' | 'mp4';
export function isVideoFileType(ext: string): ext is VideoFileType {
    return ['wmv', 'avi', 'mpg', 'mpeg', 'mp4'].includes(ext)
}
export type JsonFileType = 'json'
export function isJsonFileType(ext: string): ext is JsonFileType {
    return ext === 'json'
}

export type ZipFileType = 'zip'
export function isZipFileType(ext: string): ext is ZipFileType {
    return 'zip' === ext;
}
export type FileType = ImageFileType | AudioFileType | VideoFileType | JsonFileType | ZipFileType;
export function isFileType(ext: string): ext is FileType {
    return isImageFileType(ext) || isAudioFileType(ext) || isVideoFileType(ext) || isJsonFileType(ext) || isZipFileType(ext)
}
export class CoreError extends Error { }
/**
 * 未知错误
 */
export class UnExpectError extends CoreError { }
/**
 * 未找到错误
 */
export class NotFoundError extends CoreError { }
/**
 * 暂未实现的错误
 */
export class NoImplementError extends CoreError { }
/**
 * 禁止的文件类型错误
 */
export class ForbiddenFileTypeError extends CoreError { }
export abstract class WeBase<Settings extends object = any> {
    uniacid: number = 0;
    weid: number = 0;
    modulename: string = '';
    version: string = '1.0';
    abstract url<Query extends object = object>(p: WePlatform, d: string, query: Query): Promise<string>;
    abstract template(filename: string): Promise<void>;
    createWebUrl<Query extends object = object>(d: string, query: Query): Promise<string> {
        return this.url('web', d, query)
    }
    createMobileUrl<Query extends object = object>(d: string, query: Query): Promise<string> {
        return this.url('mobile', d, query)
    }
    async fileUpload(buf: Buffer, type: FileType, name: string): Promise<void> {
        if (!isFileType(type)) {
            throw new ForbiddenFileTypeError()
        }
        if (isImageFileType(type)) {
            await this.saveImage(buf, type, name)
        }
        if (isAudioFileType(type)) {
            await this.saveAudio(buf, type, name)
        }
        if (isVideoFileType(type)) {
            await this.saveVideo(buf, type, name)
        }
        if (isJsonFileType(type)) {
            await this.saveJson(buf, type, name)
        }
        if (isZipFileType(type)) {
            await this.saveZip(buf, type, name)
        }
        throw new UnExpectError()
    }
    /**
     * 保存zip文件
     * @param buf 
     * @param type 
     * @param name 
     */
    abstract saveZip(buf: Buffer, type: ZipFileType, name: string): Promise<void>
    /**
     * 保存json文件
     * @param buf 
     * @param type 
     * @param name 
     */
    abstract saveJson(buf: Buffer, type: JsonFileType, name: string): Promise<void>;
    /**
     * 保存图片
     * @param buf 
     * @param type 
     * @param name 
     */
    abstract saveImage(buf: Buffer, type: ImageFileType, name: string): Promise<void>;
    /**
     * 保存视频
     * @param buf 
     * @param type 
     * @param name 
     */
    abstract saveVideo(buf: Buffer, type: VideoFileType, name: string): Promise<void>;
    /**
     * 保存音频
     * @param buf 
     * @param type 
     * @param name 
     */
    abstract saveAudio(buf: Buffer, type: AudioFileType, name: string): Promise<void>;
    /**
     * 保存配置
     * @param settings 
     */
    abstract saveSettings(settings: Settings): Promise<void>;
    /**
     * 获取配置
     */
    abstract getSetting(): Promise<Settings>;
}
export abstract class WeModule extends WeBase {
}
/**
 * 模块消息处理器
 */
export abstract class WeModuleProcessor extends WeBase {
    async respText(): Promise<void> { }
    async respImage(): Promise<void> { }
    async respVoice(): Promise<void> { }
    async respVideo(): Promise<void> { }
    async respMusic(): Promise<void> { }
    async respNews(): Promise<void> { }
    async respCustom(): Promise<void> { }
    async respWxapp(): Promise<void> { }
}
/**
 * 模块订阅器
 */
export abstract class WeModuleReceiver extends WeBase {
    abstract receive(): Promise<void>;
}
export abstract class WeModuleSite extends WeBase {
    /**
     * 调用系统的支付功能
     */
    abstract pay(): Promise<void>;
    /**
     * 调用系统的退款功能
     */
    abstract refund(): Promise<void>;
    /**
     * 这是一个回调方法, 当系统在支付完成时调用这个方法通知模块支付结果.
     */
    abstract payResult(): Promise<void>;
    /**
     * 查询当前模块的特定订单支付结果
     */
    abstract payResultQuery(): Promise<void>;
}
export abstract class WeModuleWxapp extends WeBase { }
export abstract class WeModuleAliapp extends WeBase { }
export abstract class WeModuleBaiduapp extends WeBase { }
export abstract class WeModuleToutiaoapp extends WeBase { }
export abstract class WeModuleHook extends WeBase { }
export abstract class WeModuleWebapp extends WeBase { }
export abstract class WeModulePhoneapp extends WeBase { }
export abstract class WeModuleSystemWelcome extends WeBase { }
export abstract class WeModuleMobile extends WeBase {
    __call(name: string, ...args: any[]) { }
}
