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
    fechaPago: string;
    sitio: string;
    proyecto: string;
    porcentajeFactura: string;
}

@Component({
  selector: 'app-billing-status',
  templateUrl: './billing-status.component.html',
  encapsulation: ViewEncapsulation.None
  
})
export class BillingStatusComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [];
    datosHoja: transaction[] =[];
    // drawerOpened=false;
    //  drawerMode='side';
    //  range = new FormGroup({
    //     start: new FormControl<Date | null>(null),
    //     end: new FormControl<Date | null>(null),
    //     fechaDesdeInstalacion:new FormControl<Date | null>(null),
    //   });
  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    // this.filterForm = this._formBuilder.group({
    //         SMP:[''],
    //         PO:[''],
    //         valorPO:[''],
    //         fechaDesdeInstalacion:[''],
    //         fechaHastaInstalacion:[''],
    //     });
    // this.range = new FormGroup({
    //         start: new FormControl<Date | null>(null),
    //         end: new FormControl<Date | null>(null),
    //         fechaDesdeInstalacion:new FormControl<Date | null>(null),
    //       });
    this.cargueCompleto()    
  }

  ngAfterViewInit() {
        this.recentTransactionsDataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel="Cantidad";
  }

  cargueCompleto(){
    console.log("cargando el componente billing status")
    // this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA','Total pagar', 'PO', 'SMP', 'Fecha pago', 'Sitio', 'Proyecto', 'Porcentaje factura'];
    this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];

    this._httpClient.get(variablesGlobales.urlBackend + '/production/')
      .subscribe((response:any) => {
        this.datosHoja = response.result.map(function(thisBill){
          //console.log(thisBill);
          return {
            SMP: thisBill.site.smp,
            SITE_Name: thisBill.site.name,
            Escenario: thisBill.scenery,
            Banda: thisBill.band,
            Lider: 'Jesus Carrillo',
            Fecha_de_integracion: thisBill.integration.date,
            ON_AIR:thisBill.onAir.date,
            mos_HW: thisBill.mosHw.date,
            PO: thisBill.reference,
            Valor_PO: thisBill.value,
            instalacion: thisBill.instalation.date? thisBill.instalation.date :'pendiente'

            // SMP: thisBill.site.smp,
            // SITE_Name: thisBill.site.name,
            // Escenario: thisBill.scenery,
            // Banda: thisBill.band,
            // Lider: 'Jesus Carrillo',
            // Fecha_de_integracion: thisBill.integration.date,
            // ON_AIR:thisBill.onAir.date,
            // mos_HW: thisBill.mosHw.date,
            // PO: thisBill.reference,
            // Valor_PO: thisBill.value,
            // instalacion: thisBill.instalation.date? thisBill.instalation.date :'pendiente'
          }
        }); 
        this.recentTransactionsDataSource.data = this.datosHoja;
              //this.updateGrafica1();
      },
      (error) => {console.log(error);}                
    );
  }
}
