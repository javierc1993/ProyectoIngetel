import { Route } from '@angular/router';
import { UploadFilesComponent } from 'app/modules/admin/upload-files/upload-files.component';

export const uploadFilesRoutes: Route[] = [
    {
        path: '',
        component: UploadFilesComponent,
    },
];
