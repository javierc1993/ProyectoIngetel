import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExporterService } from 'services/exporter.service';

export interface transaction {
    fechaFactura: Date;
    numeroFactura:string;
    subtotal: string;
    totalFactura: string;
    rtf: string;
    rtiva: string;
    //totalPagar:string;
    poID: string;
    smpID: string;    
    sitio: string;
    proyecto: string;
    porcentajeFactura: string;
    fechaPago: Date;
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
  listInvoice: any;
  thisInvoice: any;
  drawerOpened=false;
  drawerMode='side';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    fechaDesdeInstalacion:new FormControl<Date | null>(null),
  });
  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder, private excelService:ExporterService) { 
    this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA', 'PO', 'SMP', 'Sitio', 'Proyecto', 'Porcentaje factura', 'Fecha pago', '# Documento', 'Valor pagado', 'Estado'];     
    const initDateBilling = this.getFilterLastYear();
    //console.log(JSON.stringify(initDateBilling))
    this.getData(initDateBilling);
  }
  
  getFilterLastYear(){
    var thisDate = new Date();
    var thisDateFormat = this.formatoFecha(thisDate);
    var dateLastYear = new Date();
    dateLastYear.setMonth(dateLastYear.getMonth()-12);    
    var thisDateLastYearFormat = this.formatoFecha(dateLastYear); 
    return {'fechaDesdeFactura':thisDateLastYearFormat,'fechaHastaFactura':thisDateFormat};
  }

  formatoFecha(fecha) {    
    var thisDate = fecha.getDate()+'/';     
    thisDate += (fecha.getMonth() + 1)+'/';
    thisDate += fecha.getFullYear();
    return thisDate;
  }

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({            
            PO:[''],
            SMP:[''],
            invoiceNumber:[''],
            fechaDesdeFactura:[''],
            fechaHastaFactura:[''],
            fechaDesdePago:[''],
            fechaHastaPago:[''],
        });
    this.range = new FormGroup({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null),
            fechaDesdeInstalacion:new FormControl<Date | null>(null),
          });
  }

  getData(objectToFilter){

   // console.log("cargando el componente billing status: "+JSON.stringify(objectToFilter));
    
    this._httpClient.post(variablesGlobales.urlBackend + '/invoice/',objectToFilter)
      .subscribe((response:any) => { 
        //  console.log("response: ") 
        //  console.log(response)  
        this.listInvoice = response.reduce((acc, el)=>({
          ...acc, 
          [el.invoice]:el,
        }),{});        
        this.loadDataTable();
      },
      (error) => {console.log(error);}                
    );
  }

  loadDataTable(): void {
    //console.log(this.listInvoice);
    this.datosHoja = Object.values(this.listInvoice).map(function(thisBill : any){ 
    var fechaFactura = new Date(thisBill.date);  
    fechaFactura = new Date (fechaFactura.getTime() + (3600000 * 5) );
    var fechaPago = thisBill.pay ? new Date (thisBill.pay.datePay):null;
    fechaPago = fechaPago ? new Date (fechaPago.getTime() + (3600000 * 5) ):null;
    //console.log("thisdate: "+thisDate) ;      
    return {
      fechaFactura: fechaFactura,
      numeroFactura: thisBill.invoice,
      subtotal: thisBill.subTotal,
      totalFactura: thisBill.total,
      rtf: thisBill.rtf,
      rtiva: thisBill.rtIva,
      //totalPagar:thisBill.value,
      poID: thisBill.payOrder.reference,
      smpID: thisBill.payOrder.site.smp,
      sitio: thisBill.payOrder.site.name,
      proyecto: thisBill.payOrder.scenery,
      porcentajeFactura: thisBill.percentInvoice,
      fechaPago: fechaPago,
      documentNumber: thisBill.pay ? thisBill.pay.documentNumber:null,
      valorPagado: thisBill.pay ? thisBill.pay.amountUtilized:null,
      estado: thisBill.pay ? 'pagado':'pendiente'
    }
    }); 
    //console.log(this.datosHoja);        
    this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
    this.recentTransactionsDataSource.paginator = this.paginator;
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
  getDataFilter(){
    
    if(this.filterForm.value.fechaDesdeFactura){
      this.filterForm.value.fechaDesdeFactura = this.filterForm.value.fechaDesdeFactura.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaFactura){
      this.filterForm.value.fechaHastaFactura = this.filterForm.value.fechaHastaFactura.format('DD/MM/YYYY');      
    };
    // if(this.filterForm.value.fechaDesdePago){ 
    //  this.filterForm.value.fechaDesdePago = this.filterForm.value.fechaDesdePago.format('DD/MM/YYYY');
    // };
    // if(this.filterForm.value.fechaHastaPago){   
    //  this.filterForm.value.fechaHastaPago = this.filterForm.value.fechaHastaPago.format('DD/MM/YYYY');   
    // };
    console.log(this.filterForm.value);

    //this.getData(this.filterForm.value);
    

  }
}
