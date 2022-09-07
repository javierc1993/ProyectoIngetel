import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { variablesGlobales } from 'GLOBAL';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadFilesComponent implements OnInit {
    uploadForm!: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private _httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        this.uploadForm = this.initForm();
        // this.onPathValue();
        // this.onSetValue();
    }

    // onPathValue(): void {
    //     this.uploadForm.patchValue({ name: 'Bezael' });
    // }

    // onSetValue(): void {
    //     // this.uploadForm.setValue({ comment: 'Hola mundo' });
    // }

    onSubmit(): void {
        console.log('test sendForm');
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
            );
    }

    initForm(): FormGroup {
        return this.fb.group({
            typeUpload: ['', [Validators.required]],
            thisFile: ['', [Validators.required]],
            typeFile: [''],
        });
    }

    seleccionFile(file) {
        console.log(file.name);
        console.log(file.size);
        console.log('formatType: ' + file.type);
    }
}
