import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators,} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';

export interface transaction {
    smpId: string;
    nombreSitio:string;
    poId: string;
    escenario: string;
    valorPo: string;
    //instalacion: string;
    porcentajeLiberado:string;
    porcentajeFacturado: string;
    porcentajePagado: string;
    estado: string;
}

@Component({
  selector: 'app-po-status',
  templateUrl: './po-status.component.html',  
  encapsulation: ViewEncapsulation.None
})
export class PoStatusComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterForm: UntypedFormGroup;
  formFieldHelpers: UntypedFormGroup;
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = [];
  datosHoja: transaction[] =[];
  drawerOpened=false;
  drawerMode='side';

  constructor(private _httpClient: HttpClient, private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
            valorPo:[''],
            porcentajeLiberado:[''],
            porcentajePagado:['']
        });    
    this.cargueCompleto();
  }

  ngAfterViewInit() {
        this.recentTransactionsDataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel="Cantidad";
  }

  cargueCompleto(){
    // this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA','Total pagar', 'PO', 'SMP', 'Fecha pago', 'Sitio', 'Proyecto', 'Porcentaje factura'];
    this.recentTransactionsTableColumns=['SMP','SITE Name','PO','Escenario', 'Valor PO', '% Liberado','% Facturado', '% Pagado', 'Estado'];

    this._httpClient.get(variablesGlobales.urlBackend + '/production/')
      .subscribe((response:any) => {
        //console.log(response.result);
        this.datosHoja = response.result.map(function(thisBill : any){
          //console.log(thisBill);
          var poLiberado = 0;
          var poFacturado = 0;
          var poPagado = 0;
          var estado = '';
          if(thisBill.value >= 2000000){
              poLiberado = 70;
              poFacturado = 50;
              poPagado = 20;
              estado = 'Liberado';
          }

          if(thisBill.value < 2000000 && thisBill.value >= 1000000){
              poLiberado = 100;
              poFacturado = 100;
              poPagado = 50;
              estado = 'Por pagar';
          }

          if(thisBill.value < 1000000){
              poLiberado = 100;
              poFacturado = 100;
              poPagado = 100;
              estado = 'Finalizado';
          }

          return {
            smpId: thisBill.site.smp,
            nombreSitio: thisBill.site.name,
            poId: thisBill.reference,
            escenario: thisBill.scenery,
            valorPo: thisBill.value,
            //instalacion: thisBill.instalation ? thisBill.instalation.date:'pendiente',
            porcentajeLiberado: poLiberado,
            porcentajeFacturado: poFacturado,
            porcentajePagado: poPagado,
            estado: estado
          }
        }); 
        this.recentTransactionsDataSource.data = this.datosHoja;
              //this.updateGrafica1();
      },
      (error) => {console.log(error);}                
    );
  }
  toggleDrawerOpen(): void {this.drawerOpened = !this.drawerOpened;}
  drawerOpenedChanged(opened: boolean): void{this.drawerOpened = opened;}
}
