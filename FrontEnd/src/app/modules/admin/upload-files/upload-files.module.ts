import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UploadFilesComponent } from 'app/modules/admin/upload-files/upload-files.component';
import { uploadFilesRoutes } from './upload-files.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [UploadFilesComponent],
    imports: [
        RouterModule.forChild(uploadFilesRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        SharedModule,
    ],
})
export class UploadFilesModule {}
