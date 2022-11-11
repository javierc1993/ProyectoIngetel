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
    //totalPagar:string;
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
    var thisDate = new Date();
    this.formatoFecha(thisDate, 'dd/mm/yyyy');
    this.cargueCompleto()
  }
  formatoFecha(fecha, formato) {
	//
  
    formato.replace('dd', fecha.getDate());
    formato.replace('mm', fecha.getMonth() + 1);
    formato.replace('yyyy', fecha.getFullYear());
    console.log(fecha.getMonth());
    console.log(formato);
    return formato;
  }


  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({            
            poID:[''],
            smpID:[''],
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

  cargueCompleto(){

    console.log("cargando el componente billing status")
    
    this._httpClient.post(variablesGlobales.urlBackend + '/invoice/',{})
      .subscribe((response:any) => { 
        console.log("response: ") 
        console.log(response)  
        this.listInvoice = response.reduce((acc, el)=>({
          ...acc, 
          [el.reference]:el,
        }),{});

        
        this.datosHoja = response.map(function(thisBill : any){ 
          var fechaFactura = new Date(thisBill.date);  
          fechaFactura = new Date (fechaFactura.getTime() + (3600000 * 5) );
          var fechaPago = thisBill.pay ? new Date (thisBill.pay.createdAt):null;
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
  getDataFilter(){
    var formFiltros = new Object();
    
    if(this.filterForm.value.poID){
      Object.defineProperty(formFiltros, 'PO', {
        value:this.filterForm.value.poID,
        writable: false
      });
    };
    if(this.filterForm.value.smpID){
      Object.defineProperty(formFiltros, 'SMP', {
        value:this.filterForm.value.smpID,
        writable: false
      });
    };
    if(this.filterForm.value.fechaDesdeFactura){
      Object.defineProperty(formFiltros, 'fechaDesdeFactura', {
        value:this.filterForm.value.fechaDesdeFactura.format('DD/MM/YYYY'),
        writable: false
      });
    };
    if(this.filterForm.value.fechaHastaFactura){
      Object.defineProperty(formFiltros, 'fechaHastaFactura', {
        value:this.filterForm.value.fechaHastaFactura.format('DD/MM/YYYY'),
        writable: false
      });
    };
    // if(this.filterForm.value.fechaDesdePago){      
    //   Object.defineProperty(formFiltros, 'fechaDesdePago', {
    //     value:this.filterForm.value.fechaDesdePago.format('DD/MM/YYYY'),
    //     writable: false
    //   });
    // };
    // if(this.filterForm.value.fechaHastaPago){      
    //   Object.defineProperty(formFiltros, 'fechaHastaPago', {
    //     value:this.filterForm.value.fechaHastaPago.format('DD/MM/YYYY'),
    //     writable: false
    //   });
    // };

    console.log(formFiltros);

  }
}
