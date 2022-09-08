import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { variablesGlobales } from 'GLOBAL';
import { uploadFileService } from './uploadFile.services';

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
        private uploadFileService: uploadFileService
    ) {}

    ngOnInit(): void {
        this.uploadForm = this.initForm();
        // this.onPathValue();
        // this.onSetValue();
    }



    onSubmit(): void {
      /*  console.log('test sendForm');
        console.log('Form ->', this.uploadForm.value);
        var formData: any = new FormData();
        formData.append('file', this.uploadForm.value.thisFile);
        console.log(formData);
        var typeUpload = this.uploadForm.value.typeUpload;

        this._httpClient
            .post(
                variablesGlobales.urlBackend + '/' + typeUpload + '/upload',
                formData
            )
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );*/
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
        body.append('file',this.fileTemp.fileRaw, this.fileTemp.fileName);
       // console.log(body.fileUp);
        this.uploadFileService.sendFilePost(body)
        .subscribe(res => console.log(res))
    }

    initForm(): FormGroup {
        return this.fb.group({
            typeUpload: ['', [Validators.required]],
            thisFile: ['', [Validators.required]],
            typeFile: [''],
        });
    }

    seleccionFile(file) {
        console.log(file);
        console.log(file.name);
        console.log(file.size);
        console.log(file.fileRaw);
        console.log('formatType: ' + file.type);
    }
}
