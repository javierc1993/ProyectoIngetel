import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { variablesGlobales } from 'GLOBAL';
import { uploadFileService } from './uploadFile.services';
import { catchError } from 'rxjs';
import { FuseAlertService } from '@fuse/components/alert';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadFilesComponent implements OnInit {
    uploadForm!: FormGroup;
    private fileTemp:any;

    constructor(
        private readonly fb: FormBuilder,
        private _httpClient: HttpClient,
        private uploadFileService: uploadFileService,
        private _fuseAlertService: FuseAlertService
    ) {}

    ngOnInit(): void {
        this.uploadForm = this.initForm();
        this._fuseAlertService.dismiss('badFileType');
        this._fuseAlertService.dismiss('uploadFileOk');
        this._fuseAlertService.dismiss('uploadFileBad');
        // this.onPathValue();
        // this.onSetValue();
    }




    onSubmit(): void {
         this.sendFile();
    }

    getFile($event: any): void{
        const [ file ]= $event.target.files;
        this.fileTemp ={
            fileRaw:file,
            fileName:file.name
        }        
        console.log(this.fileTemp);
    }
    sendFile(): void{
        const body = new FormData();

        var validFormat = this.validFormat(this.fileTemp.fileName);
        if(!validFormat){
            this._fuseAlertService.show('badFileType');             
        }else{
            this._fuseAlertService.dismiss('badFileType');
            body.append('file',this.fileTemp.fileRaw, this.fileTemp.fileName);
           // console.log(body.fileUp);        
            this.uploadFileService.sendFilePost(body)
            .subscribe(
                data => {
                    this._fuseAlertService.show('uploadFileOk');
                    this._fuseAlertService.dismiss('uploadFileBad');
                    console.log(data)
                },
                err => {
                    this._fuseAlertService.show('uploadFileBad');
                    this._fuseAlertService.dismiss('uploadFileOk');                                                           
                    console.log(err)
                }
            )
        }
        
        
    }

    validFormat(fileName : string){
        console.log('El nombre del archivo es: '+fileName);
        let validFormat: string[] = fileName.split('.').reverse();
        if(validFormat[0] == 'csv' || validFormat[0] == 'xlsx'){
            return true;   
        }else{
            return false;
        }

        
    }

    initForm(): FormGroup {
        return this.fb.group({
            typeUpload: ['', [Validators.required]],
            thisFile: ['', [Validators.required]]            
        });
    }

    seeAlert(alertName : string){
        this._fuseAlertService.show(alertName);
    }

    hiddenAlert(alertName : string){
        this._fuseAlertService.dismiss(alertName);
    }

    seleccionFile(file) {
        console.log(file);
        console.log(file.name);
        console.log(file.size);
        console.log(file.fileRaw);
        console.log('formatType: ' + file.type);
    }
}
function then(arg0: (res: any) => void): (value: any) => void {
    throw new Error('Function not implemented.');
}

