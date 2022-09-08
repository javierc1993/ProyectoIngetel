import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FuseAlertModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, FuseAlertModule],
})
export class SharedModule {}
