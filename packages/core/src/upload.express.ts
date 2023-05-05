import { Express } from 'express'
import { useS3, useS3Preview, useUpload } from './useUpload';
import { delAttachment, saveAttachment } from './models/attachment.model';
import { success, fail } from './utils';
export function uploadExpress(app: Express) {
    app.post('/upload/icon', useUpload('icon').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/avatar', useUpload('avatar').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/cover', useUpload('cover').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/json', useUpload('json').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/js', useUpload('js').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/css', useUpload('css').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/zip', useUpload('zip').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/audio', useUpload('audio').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/video', useUpload('video').single('file'), async (req, res, next) => {
        const file = req.file;
        if (file) {
            const { key, bucket } = file as any;
            const url = await useS3Preview(bucket, key);
            await saveAttachment(bucket, key, url)
            return success(res, { url })
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/images', useUpload('images').any(), async (req, res, next) => {
        const files = req.files;
        if (files && Array.isArray(files) && files.length > 0) {
            const urls = await Promise.all(files.map(async file => {
                const { key, bucket } = file as any;
                const url = await useS3Preview(bucket, key);
                await saveAttachment(bucket, key, url)
                return { url }
            }))
            return success(res, urls)
        } else {
            return fail(res, new Error(`上传失败`))
        }
    });
    app.post('/upload/delete', async (req, res, next) => {
        const { body } = req;
        if (!body.url) {
            throw new Error(`body.url必填`)
        }
        const url = new URL(body.url)
        const [, bucket, key] = url.pathname.split('/')
        await delAttachment(bucket, key)
        const s3 = useS3()
        await s3.deleteObject({
            Bucket: bucket,
            Key: key
        });
        return success(res, { bucket, key })
    })
}