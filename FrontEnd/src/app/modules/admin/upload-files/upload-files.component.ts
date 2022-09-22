import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uploadFileService } from './uploadFile.services';
import { catchError } from 'rxjs';
import { FuseAlertService } from '@fuse/components/alert';
import { LocalizedString } from '@angular/compiler';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadFilesComponent implements OnInit {
    uploadForm!: FormGroup;
    private fileTemp:any;

    constructor(
        //public fileType : String,
        private readonly fb: FormBuilder,
        private _httpClient: HttpClient,
        private uploadFileService: uploadFileService,
        private _fuseAlertService: FuseAlertService
    ) {}

    ngOnInit(): void {
        this.uploadForm = this.initForm();
        
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
        // console.log(this.fileTemp);
    }
    sendFile(): void{
        // this.fileType = 
        const body = new FormData();
        
        const fileType = this.uploadForm.value.typeUpload;
        var validFormat = this.validFormat(this.fileTemp.fileName);
        if(!validFormat){
            this._fuseAlertService.show('badFileType');   
            setTimeout(()=>{this._fuseAlertService.dismiss('badFileType')},3000)          
        }else{
            this._fuseAlertService.dismiss('badFileType');
            body.append('file',this.fileTemp.fileRaw, this.fileTemp.fileName);
           // console.log(body.fileUp);        
            this.uploadFileService.sendFilePost(body, fileType)
            .subscribe(
                data => {
                    this._fuseAlertService.dismiss('uploadFileBad');
                    this._fuseAlertService.show('uploadFileOk');
                    setTimeout(()=>{this._fuseAlertService.dismiss('uploadFileOk')},3000)                    
                    console.log(data)
                },
                err => {
                    this._fuseAlertService.dismiss('uploadFileOk');
                    this._fuseAlertService.show('uploadFileBad');                    
                    setTimeout(()=>{this._fuseAlertService.dismiss('uploadFileBad')},3000)                                                       
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
}
function then(arg0: (res: any) => void): (value: any) => void {
    throw new Error('Function not implemented.');
}

