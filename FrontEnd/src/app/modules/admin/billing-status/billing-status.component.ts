import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, FormGroup, FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExporterService } from 'services/exporter.service';
import { FuseConfirmationService} from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';

export interface transaction {
    fechaFactura: Date;
    numeroFactura:string;
    subtotal: number;
    totalFactura: number;
    rtf: number;
    rtiva: number;
    //totalPagar:string;
    poID: string;
    smpID: string;    
    sitio: string;
    proyecto: string;
    porcentajeFactura: string;
    fechaPago: Date;
    valorUtilizado: number;
    estado: string;
    iva: number;    
    valorTransaccion: number;
    valorPagado: number;
}

interface Operator {
  value: string;
  viewValue: string;
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
  recentTransactionsDataSource: MatTableDataSource<transaction>;
  recentTransactionsTableColumns: string[] = [];
  datosHoja: transaction[] =[];
  valorTotalFacturado: number = 0;
  valorTotalIva: number = 0;
  valorTotalRetenciones: number = 0;
  valorTotalUtilizado: number = 0;
  valorTotalCostoTransaccion: number = 0;
  valorTotalPagado: number = 0;
  listInvoice: any;
  thisInvoice: any;
  drawerOpened=false;
  drawerMode='side';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    fechaDesdeInstalacion:new FormControl<Date | null>(null),
  });
  operatorsValue: Operator[] = [
    {value: 'igual', viewValue: 'Igual'},
    {value: 'top', viewValue: 'Mayor o igual'},
    {value: 'button', viewValue: 'Menor o igual'}
  ];

  operatorsString: Operator[] = [
    {value: 'content', viewValue: 'Contiene'},
    {value: 'noContent', viewValue: 'No contiene'}
  ];

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: UntypedFormBuilder,
    private excelService:ExporterService,
    public _fuseConfirmationService: FuseConfirmationService,
    private _fuseAlertService: FuseAlertService
    ) { 
    this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total IVA', 'RTF', 'RTIVA', 'PO', 'SMP', 'Sitio', 'Proyecto', 'Porcentaje factura', 'Fecha pago', 'Valor pagado', 'Eliminar','Estado'];     
    const initDateBilling = this.getFilterLastYear();
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
        factura:[''],
        porcentajeFacturacion:[''],
        fechaDesdeFactura:[''],
        fechaHastaFactura:[''],
        fechaDesdePago:[''],
        fechaHastaPago:[''],
        operadorPO:[''],
        operadorFactura:[''],
        operadorPorcentajeFacturacion:['']
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
        this.listInvoice = response.reduce((acc, el)=>({
          ...acc, 
          [el.invoice]:el,
        }),{});        
        this.loadDataTable();
        this.updateTotalValues(); 
      },
      (error) => {console.log(error);}                
    );
  }

  loadDataTable(): void {   
    console.log(this.listInvoice)    
    this.datosHoja = Object.values(this.listInvoice).map(function(thisBill : any){ 
    var fechaFactura = new Date(thisBill.date);  
    fechaFactura = new Date (fechaFactura.getTime() + (3600000 * 5) );
    var fechaPago = thisBill.pay ? new Date (thisBill.pay.datePay):null;
    fechaPago = fechaPago ? new Date (fechaPago.getTime() + (3600000 * 5) ):null;
    var estado;
    if(thisBill.percentInvoice > 100){
      estado = 'Error facturacion';
    }else if(!thisBill.pay){
      estado = 'Pendiente';
    }else{
      var amountUtilized = parseFloat(thisBill.pay.amountUtilized.toFixed(2));
      var toPaid = parseFloat((thisBill.subTotal + thisBill.iva - thisBill.rtf - thisBill.rtIva).toFixed(2));      
      if(Math.round(amountUtilized) != Math.round(toPaid)){
        estado = 'Error pago';
      }else{
        estado = 'Pagado';
      }
    }
    return {
      fechaFactura: fechaFactura,
      numeroFactura: thisBill.invoice,
      subtotal: thisBill.subTotal,
      totalFactura: thisBill.total,
      rtf: thisBill.rtf,
      rtiva: thisBill.rtIva,
      //totalPagar:thisBill.value,
      poID: thisBill.payOrder?.reference,
      smpID: thisBill.payOrder?.site?.smp,
      sitio: thisBill.payOrder?.site?.name,
      proyecto: thisBill.payOrder?.scenery,
      porcentajeFactura: thisBill.percentInvoice+'%',
      fechaPago: fechaPago,
      documentNumber: thisBill.pay ? thisBill.pay.documentNumber:null,
      valorUtilizado: thisBill.pay ? thisBill.pay.amountUtilized:0,
      estado: estado,
      iva: thisBill.iva,
      valorTransaccion: thisBill.pay ? thisBill.pay.financialCost:0,
      valorPagado: thisBill.pay ? thisBill.pay.totalPaid:0
    }
    }); 
    this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
    this.recentTransactionsDataSource.paginator = this.paginator;
  }

  updateTotalValues(){
    this.valorTotalFacturado = 0;
    this.valorTotalIva = 0;
    this.valorTotalUtilizado = 0;   
    this.valorTotalCostoTransaccion = 0;
    this.valorTotalRetenciones = 0;
    this.valorTotalPagado = 0;

    this.recentTransactionsDataSource.filteredData.forEach(element => {
      this.valorTotalFacturado += element.subtotal;
      this.valorTotalIva += element.iva;   
      this.valorTotalRetenciones += element.rtf + element.rtiva;
      this.valorTotalUtilizado += element.valorUtilizado;
      this.valorTotalCostoTransaccion += element.valorTransaccion;
      this.valorTotalPagado += element.valorPagado;          
    });
    this.valorTotalFacturado = parseFloat(this.valorTotalFacturado.toFixed(2));
    this.valorTotalIva = parseFloat(this.valorTotalIva.toFixed(2));
    this.valorTotalRetenciones = parseFloat(this.valorTotalRetenciones.toFixed(2));
    this.valorTotalUtilizado = parseFloat(this.valorTotalUtilizado.toFixed(2));
    this.valorTotalCostoTransaccion = parseFloat(this.valorTotalCostoTransaccion.toFixed(2));
    this.valorTotalPagado = parseFloat(this.valorTotalPagado.toFixed(2));
  }

  toggleDrawerOpen(): void {this.drawerOpened = !this.drawerOpened;}
  toggleDrawerClose(): void {this.drawerOpened = this.drawerOpened ? false:false;}
  //drawerOpenedChanged(opened: boolean): void{this.drawerOpened = opened;}
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.recentTransactionsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.recentTransactionsDataSource.paginator) {
      this.recentTransactionsDataSource.paginator.firstPage();
    }
    this.updateTotalValues();
  }
  exportAsXLSX():void{
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'Billing_status');
  }
  getDataFilter(){    
    if(this.filterForm.value.fechaDesdeFactura){
      this.filterForm.value.fechaDesdeFactura = this.filterForm.value.fechaDesdeFactura.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaFactura){
      this.filterForm.value.fechaHastaFactura = this.filterForm.value.fechaHastaFactura.format('DD/MM/YYYY');      
    };
    if(this.filterForm.value.fechaDesdePago){ 
     this.filterForm.value.fechaDesdePago = this.filterForm.value.fechaDesdePago.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaPago){   
     this.filterForm.value.fechaHastaPago = this.filterForm.value.fechaHastaPago.format('DD/MM/YYYY');   
    };
    if(!this.filterForm.value.PO){this.filterForm.value.operadorPO = ""}
    if(!this.filterForm.value.factura){this.filterForm.value.operadorFactura = ""}
    if(!this.filterForm.value.porcentajeFacturacion){this.filterForm.value.operadorPorcentajeFacturacion = ""}
    //console.log(this.filterForm.value);
    // if(this.filterForm.value.operadorPO){
    //     Object.defineProperty(formFiltros, 'operadorPO', {
    //         value:this.filterForm.value.operatorPO,
    //         writable: false
    //       });
    // };

    this.getData(this.filterForm.value);
    this.toggleDrawerClose();
  }

  confirmDelete(numeroFactura):void {
    const dialogRef = this._fuseConfirmationService.open({title: "Eliminar factura",
      message : "Seguro quieres eliminar la factura: "+numeroFactura+"?",
      actions : {
            confirm: {
                show : true,
                label: 'Eliminar',
                color: 'warn'
            },
            cancel : {
                show : true,
                label: 'Cancelar'
            }
        },
      dismissible: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result == "confirmed"){
        this.deleteInvoice(numeroFactura);        
      }      
    });
  }
  deleteInvoice(numeroFactura){ 
    this._httpClient.delete(variablesGlobales.urlBackend+'/invoice/'+numeroFactura)
      .subscribe((data) => {
        delete this.listInvoice[numeroFactura];  
        this.loadDataTable();
        this.updateTotalValues();
        this._fuseAlertService.show('deleteInvoiceOk');   
        setTimeout(()=>{this._fuseAlertService.dismiss('deleteInvoiceOk')},3000)
      },
      (error) => {
        console.log(error);
        this._fuseAlertService.show('deleteInvoiceError');   
        setTimeout(()=>{this._fuseAlertService.dismiss('deleteInvoiceError')},3000)
      }                
    ); 
  }
}
