import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { inicioRoutes } from './inicio.routing';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';




@NgModule({
  declarations: [InicioComponent],
  imports: [
    RouterModule.forChild(inicioRoutes),    
    SharedModule
  ]
})
export class InicioModule { }
