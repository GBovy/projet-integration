import { Component, EventEmitter, Input } from '@angular/core';
import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';
import { FileCheckStatusEnum } from 'src/app/models/enums/file-check-status.enum';
import { BaseWebService } from 'src/app/services/base.web.service';
import { environment } from 'src/environments/environment';
import { FileUtil } from '../../helpers/file.utils';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

    FileCheckStatusEnum = FileCheckStatusEnum;

    @Input()
    public fileName: string;

    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;
    error: FileCheckStatusEnum;
    done: boolean;

    constructor() {
        this.options = { concurrency: 1 };
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
        this.done = false;
    }

    public onUploadOutput(output: UploadOutput, fileName: string): void {
        if (output.type === 'allAddedToQueue') {
            if (this.files[0] && this.files[0].progress.status === UploadStatus.Queue) {

                const baseService = new BaseWebService(null, null);

                const event: UploadInput = {
                    type: 'uploadFile',
                    url: `${environment.baseUrl}/user/file`,
                    method: 'PUT',
                    data: { fileName: fileName },
                    file: this.files[0],
                    headers: baseService.getDefaultHeaderObject()
                };
                this.uploadInput.emit(event);
            }
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            const check = FileUtil.doCheck(output.file);
            if (check === FileCheckStatusEnum.OK && this.files.length === 0) {
                this.files.push(output.file);
            } else {
                this.error = check;
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        } else if (output.type === 'done') {
            this.done = true;
        // } else if ((output.type === 'rejected' && typeof output.file !== 'undefined')) {
        //     this.cancelUpload(output.file.id);
        }

        this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
    }
}
