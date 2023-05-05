
import { UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
const usebeforeIconUpload = (types: string[], limit: number) => (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!types.includes(file.type)) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < limit;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
export function useUpload(type: 'icon' | 'avatar' | 'cover' | 'json' | 'js' | 'css' | 'zip' | 'audio' | 'video' | 'images' = 'icon') {
    const uploadProps: UploadProps = {
        action: '/upload/' + type,
        beforeUpload: (file, fileList) => { }
    }
    if (type === 'images') {
        uploadProps.multiple = true;
        uploadProps.beforeUpload = usebeforeIconUpload([],2);
    }
    return {
        uploadProps
    }
}