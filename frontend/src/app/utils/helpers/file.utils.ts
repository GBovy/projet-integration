import { UploadFile } from 'ngx-uploader';
import { environment } from 'src/environments/environment';
import { FileCheckStatusEnum } from '../../models/enums/file-check-status.enum';

export class FileUtil {

    public static checkExtention(type: string): boolean {
        return environment.uploadFilesConstants.type.includes(type);
    }

    public static checkSize(size: number): boolean {
        return size <= environment.uploadFilesConstants.maxSize; // 10MB
    }

    public static checkNameSize(name: string): boolean {
        return name && name.length <= 120;
    }

    public static doCheck(file: UploadFile): FileCheckStatusEnum {
        let result: FileCheckStatusEnum;
        if (!this.checkExtention(file.type)) {
            result = FileCheckStatusEnum.EXTENSION;
        } else if (!this.checkSize(file.size)) {
            result = FileCheckStatusEnum.SIZE;
        } else if (!this.checkNameSize(file.name)) {
            result = FileCheckStatusEnum.NAME_SIZE;
        } else {
            result = FileCheckStatusEnum.OK;
        }
        return result;
    }
}
