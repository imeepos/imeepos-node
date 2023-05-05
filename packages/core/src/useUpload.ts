import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client, S3, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';
import { extname } from 'path';

export const useS3Preview = (bucket: string, key: string) => {
    const client = useS3Client()
    return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }));
}

export const useS3 = () => {
    return new S3({
        apiVersion: '2006-03-01',
        endpoint: process.env.S3_ENDPOINT!,
        credentials: {
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            accessKeyId: process.env.S3_ACCESS_KEY_ID!
        },
        forcePathStyle: true,
        region: 'us-west-2'
    });
}
export const useS3Client = () => {
    return new S3Client({
        apiVersion: '2006-03-01',
        endpoint: process.env.S3_ENDPOINT!,
        credentials: {
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            accessKeyId: process.env.S3_ACCESS_KEY_ID!
        },
        forcePathStyle: true,
        region: 'us-west-2'
    });
}
export const useUpload = (bucketName: string) => {
    const client = useS3Client();
    return multer({
        storage: multerS3({
            s3: client,
            bucket: bucketName,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            contentType(req, file, cb) {
                cb(null, file.mimetype)
            },
            key: (req, file, cb) => {
                cb(null, v4() + extname(file.originalname))
            }
        })
    })
}