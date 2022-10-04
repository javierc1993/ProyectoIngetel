import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators,} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import { ExporterService } from 'services/exporter.service';

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
  recentTransactionsDataSource: MatTableDataSource<transaction>;
  recentTransactionsTableColumns: string[] = [];
  datosHoja: transaction[] =[];
  drawerOpened=false;
  drawerMode='side';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    fechaDesdeInstalacion:new FormControl<Date | null>(null),
  });
  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder, private excelService:ExporterService) { this.cargueCompleto()}

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
  }

  cargueCompleto(){
    console.log("cargando el componente billing status")
    this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA','Total pagar', 'PO', 'SMP', 'Sitio', 'Proyecto', 'Porcentaje factura', 'Fecha pago', 'Estado'];
    this._httpClient.post(variablesGlobales.urlBackend + '/production/',{})
      .subscribe((response:any) => {        
        this.datosHoja = response.result.map(function(thisBill : any){ 
          var thisDate = new Date();  
          console.log("thisdate: "+thisDate) ;      
          return {
            fechaFactura: thisBill.instalation ? thisBill.instalation.date:thisDate,
            numeroFactura: thisBill.reference,
            subtotal: thisBill.value,
            totalFactura: thisBill.value,
            rtf: thisBill.value,
            rtiva: thisBill.value,
            totalPagar:thisBill.value,
            poID: thisBill.reference,
            smpID: thisBill.site.smp,            
            sitio: thisBill.site.name,
            proyecto: thisBill.site.name,
            porcentajeFactura: thisBill.site.name,
            fechaPago: thisBill.instalation ? thisBill.instalation.date:'pendiente',
            estado: thisBill.instalation.date ? 'pagado':'pendiente'
          }
        });         
        this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
        this.recentTransactionsDataSource.paginator = this.paginator;
              //this.updateGrafica1();
      },
      (error) => {console.log(error);}                
    );
  }
  toggleDrawerOpen(): void {this.drawerOpened = !this.drawerOpened;}
  drawerOpenedChanged(opened: boolean): void{this.drawerOpened = opened;}
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.recentTransactionsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.recentTransactionsDataSource.paginator) {
      this.recentTransactionsDataSource.paginator.firstPage();
    }
    //console.log($event);
  }
  exportAsXLSX():void{
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'PO_status')
    console.log("descargando")
  }
}
