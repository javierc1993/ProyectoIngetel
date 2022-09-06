import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadFilesComponent implements OnInit {
    contactForm!: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        this.contactForm = this.initForm();
        // this.onPathValue();
        // this.onSetValue();
    }

    onPathValue(): void {
        this.contactForm.patchValue({ name: 'Bezael' });
    }

    onSetValue(): void {
        // this.contactForm.setValue({ comment: 'Hola mundo' });
    }

    onSubmit(): void {
        console.log('Form ->', this.contactForm.value);
    }

    initForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            checkAdult: ['', [Validators.required]],
            department: [''],
            comment: ['', [Validators.required]],
        });
    }
}
