import { NgModule } from '@angular/core';
import { UploadFilesComponent } from './upload-files.component';
import { uploadFilesRoutes } from './upload-files.routing';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [UploadFilesComponent],
    imports: [
        RouterModule.forChild(uploadFilesRoutes),        
        SharedModule,
    ],
})
export class UploadFilesModule {}
