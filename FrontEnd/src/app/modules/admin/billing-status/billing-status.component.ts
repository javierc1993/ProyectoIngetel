import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators,} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';

export interface transaction {
    fechaFactura: string;
    numeroFactura:string;
    subtotal: string;
    totalFactura: string;
    rtf: string;
    rtiva: string;
    totalPagar:string;
    poID: string;
    smpID: string;    
    sitio: string;
    proyecto: string;
    porcentajeFactura: string;
    fechaPago: string;
    estado: string;
}

@Component({
  selector: 'app-billing-status',
  templateUrl: './billing-status.component.html',
  encapsulation: ViewEncapsulation.None
  
})
export class BillingStatusComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterForm: UntypedFormGroup;
  formFieldHelpers: UntypedFormGroup;
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = [];
  datosHoja: transaction[] =[];
  drawerOpened=false;
  drawerMode='side';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    fechaDesdeInstalacion:new FormControl<Date | null>(null),
  });
  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
            smpID:[''],
            poID:[''],
            totalPagar:[''],
            fechaDesdeFactura:[''],
            fechaHastaFactura:[''],
        });
    this.range = new FormGroup({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null),
            fechaDesdeInstalacion:new FormControl<Date | null>(null),
          });
    this.cargueCompleto()    
  }

  ngAfterViewInit() {
        this.recentTransactionsDataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel="Cantidad";
  }

  cargueCompleto(){
    console.log("cargando el componente billing status")
    this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA','Total pagar', 'PO', 'SMP', 'Sitio', 'Proyecto', 'Porcentaje factura', 'Fecha pago', 'Estado'];
    //this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];

    this._httpClient.get(variablesGlobales.urlBackend + '/production/')
      .subscribe((response:any) => {
        console.log(response.result);
        this.datosHoja = response.result.map(function(thisBill){
          //console.log(thisBill);
          return {
            fechaFactura: thisBill.site.smp,
            numeroFactura: thisBill.site.name,
            subtotal: thisBill.value,
            totalFactura: thisBill.value,
            rtf: thisBill.value,
            rtiva: thisBill.value,
            totalPagar:thisBill.value,
            poID: thisBill.mosHw.date,
            smpID: thisBill.reference,            
            sitio: thisBill.site.name,
            proyecto: thisBill.site.name,
            porcentajeFactura: thisBill.site.name,
            fechaPago: thisBill.instalation.date,
            estado: thisBill.instalation.date? 'pagado' :'pendiente'
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
