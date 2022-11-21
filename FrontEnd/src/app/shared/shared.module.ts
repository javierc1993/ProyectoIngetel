import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule, MatAccordion} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FuseHighlightModule } from '@fuse/components/highlight';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FuseDrawerModule } from '@fuse/components/drawer';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatChipsModule } from '@angular/material/chips';
import { ExporterService } from 'services/exporter.service';
 import {MatDialogModule} from '@angular/material/dialog';
 import { FuseConfirmationModule } from '@fuse/services/confirmation';
@NgModule({
    imports: [CommonModule,
        FormsModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        MatTableModule,
        FuseAlertModule, 
        MatFormFieldModule,
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatCheckboxModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatRadioModule,
        MatPaginatorModule,
        FuseHighlightModule,
        MatDatepickerModule,
        FuseDrawerModule,        
        MatGridListModule,       
        MatMomentDateModule,
        MatChipsModule,
         MatDialogModule,
         FuseConfirmationModule
    ],
    exports: [CommonModule,
        FormsModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        MatTableModule,
        FuseAlertModule, 
        MatFormFieldModule,
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatCheckboxModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatRadioModule,
        MatPaginatorModule,
        FuseHighlightModule,
        MatDatepickerModule,
        FuseDrawerModule,        
        MatGridListModule,       
        MatMomentDateModule,
        MatChipsModule,
         MatDialogModule,
         FuseConfirmationModule
    ],
    providers:[ExporterService]
})
export class SharedModule {}
