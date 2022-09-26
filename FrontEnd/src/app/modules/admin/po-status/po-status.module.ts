import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { poStatusRoutes } from './po-status.routing';
import { PoStatusComponent } from './po-status.component';



@NgModule({
  declarations: [PoStatusComponent],
  imports: [
    RouterModule.forChild(poStatusRoutes),
    SharedModule
  ]
})
export class PoStatusModule { }
