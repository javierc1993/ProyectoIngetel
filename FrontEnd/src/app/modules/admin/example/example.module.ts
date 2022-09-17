import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { FuseCardModule } from '@fuse/components/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
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
        MatExpansionModule,
        FuseDrawerModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatDatepickerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatMomentDateModule
    ]
})
export class ExampleModule {}
