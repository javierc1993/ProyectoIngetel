import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UploadFilesComponent } from 'app/modules/admin/upload-files/upload-files.component';
import { uploadFilesRoutes } from './upload-files.routing';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [UploadFilesComponent],
    imports: [
        RouterModule.forChild(uploadFilesRoutes),        
        SharedModule,
    ],
})
export class UploadFilesModule {}
