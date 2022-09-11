import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { FuseCardModule } from '@fuse/components/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
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
        MatTableModule,
        MatRadioModule,
        FormsModule,
        CommonModule,
        MatExpansionModule
    ]
})
export class ExampleModule {}
