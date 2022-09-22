import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BillingStatusComponent } from './billing-status.component';
import { billingStatusRoutes } from './billing-status.routing';



@NgModule({
  declarations: [BillingStatusComponent],
  imports: [ 
    RouterModule.forChild(billingStatusRoutes),    
    SharedModule
  ]
})
export class BillingStatusModule { }
