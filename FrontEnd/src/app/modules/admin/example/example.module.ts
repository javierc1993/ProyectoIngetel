import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { FuseCardModule } from '@fuse/components/card';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExampleComponent,
    },
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatTableModule
    ]
})
export class ExampleModule {}
