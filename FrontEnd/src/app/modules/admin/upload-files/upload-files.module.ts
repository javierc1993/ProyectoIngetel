import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UploadFilesComponent } from 'app/modules/admin/upload-files/upload-files.component';
import { FuseCardModule } from '@fuse/components/card';
import { uploadFilesRoutes } from './upload-files.routing';

@NgModule({
    declarations: [UploadFilesComponent],
    imports: [RouterModule.forChild(uploadFilesRoutes), FuseCardModule],
})
export class UploadFilesModule {}
