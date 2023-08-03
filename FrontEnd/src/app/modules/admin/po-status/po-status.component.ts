import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertService } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { variablesGlobales } from 'GLOBAL';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis} from "ng-apexcharts";
import { ExporterService } from 'services/exporter.service';

export interface transaction {
    mainSmp: string;
    smp: string;
    nombreSitio:string;
    po: string;
    poDate: Date;
    escenario: string;
    valorPo: number;
    //instalacion: string;
    porcentajeLiberado:string;
    porcentajeFacturado: string;
    porcentajePagado: string;
    estado: string;
    valorPoFacturado : number;    
    valorPoIva: number;
    valorPoRetenciones :number;
    valorPoPagado: number;
    porcentajesConcat:string;
}
interface Operator {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-po-status',
  templateUrl: './po-status.component.html',    
})
export class PoStatusComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  filterForm: UntypedFormGroup;
  formFieldHelpers: UntypedFormGroup;
  //private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  //recentTransactionsDataSource: MatTableDataSource<transaction>;
  recentTransactionsDataSource: MatTableDataSource<transaction>;
  recentTransactionsTableColumns: string[] = [];  
  datosHoja: transaction[] =[];
  valorTotalPO: number = 0;
  valorTotalFacturado: number = 0;
  valorTotalIva: number = 0;
  valorTotalRetenciones: number = 0;
  valorTotalPagado: number = 0;
  listPO: any;
  thisPO: any;
  drawerOpened=false;
  drawerMode='side';
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
    public dialog: MatDialog,
    public _fuseConfirmationService: FuseConfirmationService,
    private _fuseAlertService: FuseAlertService
    ) { 
    this.recentTransactionsTableColumns=['SMP Principal','SMP','SITE Name','PO','poDate','Escenario', 'Valor PO', '% Liberado','% Facturado', '% Pagado', 'ver PO', 'eliminar PO' ,'Estado'];
    const initDateBilling = this.getFilterLastYear();
    this.getData(initDateBilling);
  }

  getFilterLastYear(){
    var thisDate = new Date();
    var thisDateFormat = this.formatoFecha(thisDate);
    var dateLastYear = new Date();
    dateLastYear.setMonth(dateLastYear.getMonth()-12);    
    var thisDateLastYearFormat = this.formatoFecha(dateLastYear); 
    return {'fechaDesdePoDate':thisDateLastYearFormat,'fechaHastaPoDate':thisDateFormat};
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
      principalSmp:[''],
      SMP:[''],
      valorPO:[''],
      escenario:[''],
      porcentajeLiberacion:[''],
      porcentajeFacturacionAcumulado:[''],
      fechaDesdePoDate:[''],
      fechaHastaPoDate:[''],      
      operadorPO:[''],
      operadorPrincipalSmp:[''],
      operadorSitio:[''],
      operadorValorPO:[''],
      operadorEscenario:[''],
      operadorPorcentajeLiberacion:[''],
      operadorPorcentajeFacturacionAcumulado:['']
    });        
  }

  getData(objectToFilter){
    console.log(objectToFilter);
    this._httpClient.post(variablesGlobales.urlBackend + '/production/', objectToFilter)
      .subscribe((response:any) => {
        console.log(response.result);
        this.listPO = response.result.reduce((acc, el)=>({
          ...acc, 
          [el.reference]:el,
        }),{}); 
        this.loadDataTable();
        this.updateTotalValues();
      },
      (error) => {console.log(error);}                
    );
  }

  loadDataTable(): void {
    this.datosHoja = Object.values(this.listPO).map(function(thisBill : any){
      var percentLiberado;
      var percentFacturado;
      var percentPagado;
      var valorPoTotal = thisBill.value;
      var valorPoFacturado;
      var valorPoIva;
      var valorPoRetenciones;
      var valorPoPagado;
      var estado;

      percentLiberado = thisBill.release[0] ? thisBill.release[0].totalPercent:0;   
      var fechaPo = new Date(thisBill.poDate);  
      fechaPo = new Date (fechaPo.getTime() + (3600000 * 5) );
          
      if(thisBill.invoice){
        var porcentajeFacturado = thisBill.invoice.map(thisInvoice => thisInvoice.percentInvoice);
        var valorFacturado = thisBill.invoice.map(thisInvoice => thisInvoice.subTotal);
        var valorIva = thisBill.invoice.map(thisInvoice => thisInvoice.iva);
        var valorRtf = thisBill.invoice.map(thisInvoice => thisInvoice.rtf);
        var valorRtiva = thisBill.invoice.map(thisInvoice => thisInvoice.rtIva);
        var porcentajePagado = thisBill.invoice.map(function(thisInvoice:any){
            if(thisInvoice.pay && thisInvoice.pay.datePay && thisInvoice.pay.amountUtilized > 0){return thisInvoice.percentInvoice;}
            else{return 0;}
        });
        var valorPagado = thisBill.invoice.map(function(thisInvoice:any){
            //if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.amountUtilized;}
            if(thisInvoice.pay && thisInvoice.pay.datePay){return thisInvoice.pay.amountUtilized;}
            else{return 0;}
        });
        percentFacturado = porcentajeFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoFacturado = valorFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoIva = valorIva.reduce((acc,valor)=>acc+valor,0);
        valorPoRetenciones = valorRtf.reduce((acc,valor)=>acc+valor,0) + valorRtiva.reduce((acc,valor)=>acc+valor,0);
        percentPagado = porcentajePagado.reduce((acc,valor)=>acc+valor,0);
        valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0);            
      }         
          
      if(percentFacturado > 100){estado = 'Error facturacion';}
      else if((Math.round(valorPoFacturado) != Math.round(valorPoTotal*percentFacturado/100))&&(Math.round(valorPoFacturado)+1 != Math.round(valorPoTotal*percentFacturado/100) && Math.round(valorPoFacturado)-1 != Math.round(valorPoTotal*percentFacturado/100))){
        estado = 'Error facturacion';
      }
      // else if(percentLiberado == 0){estado = 'Pendiente';}
      else if(percentFacturado == percentPagado && Math.round(valorPoFacturado + valorPoIva - valorPoRetenciones) != Math.round(valorPoPagado)){estado = 'Error pago';}
      else if(percentLiberado > percentFacturado){estado = 'Por facturar';}
      else if(percentLiberado <= percentFacturado && percentFacturado > percentPagado){estado = 'Por pagar';}          
      else if(percentLiberado == percentPagado && percentLiberado == 100 && Math.round(valorPoFacturado + valorPoIva  - valorPoRetenciones) == Math.round(valorPoPagado)){estado = 'Finalizado';}
      else if(percentLiberado == percentPagado && percentLiberado < 100){estado = 'Pendiente';}
      else if(percentFacturado > percentLiberado){estado = 'Por liberar';}
      else{estado = 'Sin estado';}
      

      return {
        mainSmp: thisBill.site?.mainSmp,
        smp: thisBill.site?.smp,
        nombreSitio: thisBill.site?.name,
        po: thisBill.reference,
        poDate : fechaPo,
        escenario: thisBill.scenery,
        valorPo: thisBill.value,
        //instalacion: thisBill.instalation?.date ? thisBill.instalation.date:'pendiente',
        porcentajeLiberado: percentLiberado+'%',
        porcentajeFacturado: percentFacturado+'%',
        porcentajePagado: percentPagado+'%',
        estado,
        valorPoFacturado,
        valorPoIva,
        valorPoRetenciones,
        valorPoPagado,
        porcentajesConcat:percentLiberado+'%'+percentFacturado+'%'+percentPagado+'%'
      }
    });         
    this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
    this.recentTransactionsDataSource.paginator = this.paginator;
  }

  updateTotalValues(){        
    this.valorTotalPO = 0;
    this.valorTotalFacturado = 0;
    this.valorTotalIva = 0;
    this.valorTotalRetenciones = 0;
    this.valorTotalPagado = 0;   
    this.recentTransactionsDataSource.filteredData.forEach(element => {
      this.valorTotalPO += element.valorPo;
      this.valorTotalFacturado += element.valorPoFacturado;
      this.valorTotalIva += element.valorPoIva;
      this.valorTotalRetenciones += element.valorPoRetenciones;
      this.valorTotalPagado += element.valorPoPagado;
    });
    this.valorTotalPO = parseFloat(this.valorTotalPO.toFixed(2));
    this.valorTotalFacturado = parseFloat(this.valorTotalFacturado.toFixed(2));
    this.valorTotalIva = parseFloat(this.valorTotalIva.toFixed(2));
    this.valorTotalRetenciones = parseFloat(this.valorTotalRetenciones.toFixed(2));
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
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'PO_status');
  }

  getDataFilter(){
    //console.log(this.filterForm.value)
    //console.log("value to filter:"+JSON.stringify(this.filterForm.value));
    if(this.filterForm.value.fechaDesdePoDate){
      this.filterForm.value.fechaDesdePoDate = this.filterForm.value.fechaDesdePoDate.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaPoDate){
      this.filterForm.value.fechaHastaPoDate = this.filterForm.value.fechaHastaPoDate.format('DD/MM/YYYY');
    };
    if(!this.filterForm.value.PO){this.filterForm.value.operadorPO = ""}
    if(!this.filterForm.value.principalSmp){this.filterForm.value.operadorPrincipalSmp = ""}
    if(!this.filterForm.value.SMP){this.filterForm.value.operadorSitio = ""}
    if(!this.filterForm.value.valorPO){this.filterForm.value.operadorValorPO = null}
    if(!this.filterForm.value.escenario){this.filterForm.value.operadorEscenario = ""}
    if(!this.filterForm.value.porcentajeLiberacion){this.filterForm.value.operadorPorcentajeLiberacion = ""}
    if(!this.filterForm.value.porcentajeFacturacionAcumulado){this.filterForm.value.operadorPorcentajeFacturacionAcumulado = ""}
    this.getData(this.filterForm.value);
    this.toggleDrawerClose();
  }
  
  verPO(po, statusPO):void {
    this.thisPO = this.listPO[po];
    this.thisPO.status =  statusPO;
    this.thisPO.isChange =  false;  
    const dialogRef = this.dialog.open(PoStatusDialog,{
      data: this.thisPO
    });    
    //console.log(this.thisPO)
    dialogRef.afterClosed().subscribe(result => { 
      if(this.thisPO.isChange){
        this.loadDataTable();
      }  
    });
  }

  confirmDelete(numeroPo):void {
    const dialogRef = this._fuseConfirmationService.open({title: "Eliminar PO",
      message : "Seguro quieres eliminar la PO: "+numeroPo+"?",
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
        this.deleteInvoice(numeroPo);        
      }else{
        console.log("dont delete");
      }
      
    });
  }
  deleteInvoice(numeroPo){
    this._httpClient.delete(variablesGlobales.urlBackend + '/payOrder/'+ numeroPo)
      .subscribe((data) => {
        delete this.listPO[numeroPo];
        this.loadDataTable();
        this.updateTotalValues();
        this._fuseAlertService.show('deletePoOk');   
        setTimeout(()=>{this._fuseAlertService.dismiss('deletePoOk')},3000)
      },
      (error) => {
        console.log(error);
        this._fuseAlertService.show('deletePoError');   
        setTimeout(()=>{this._fuseAlertService.dismiss('deletePoError')},3000)
      }                
    );
  }
  
  
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels:ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle; 
};

@Component({
  selector: 'po-status-dialog',
  templateUrl: 'po-status-dialog.html',  
})

export class PoStatusDialog implements OnInit {
  public updatePOForm: FormGroup = new FormGroup({});
  public isRelease: boolean;
  public isInvoice: boolean;
  public percentLiberado: Int16Array;
  public percentFacturado: Int16Array;
  public percentPagado: Int16Array;
  public chartBarValues: Partial<ChartOptions>;

  constructor(private _httpClient: HttpClient ,public dialogRef: MatDialogRef<PoStatusDialog>, @Inject(MAT_DIALOG_DATA) public thisPO: any, private _formBuilder: UntypedFormBuilder) {
    this.chartBarValues = {
      
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "40"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },      
      title: {
        text: "Valores PO"
      },
      xaxis: {
        categories: ["Valor PO", "Valor facturado",  "Fact + iva - RET",  "Valor pagado"]
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            const numero = value.toLocaleString("en");
            return "$ "+numero;
          }
        },
      },
      series: [
        {
          name: "Valor",
          data: [0, 0, 0, 0]
        }
      ]
      
    };
  }

  ngOnInit(): void {
    this.initUpdatePOForm();              
  }

  initUpdatePOForm():void{
    console.log("version 27/06/2023");
    console.log(this.thisPO);
    this.isRelease = this.thisPO.release.length >= 1 ? true:false;
    this.isInvoice = this.thisPO.invoice.length >= 1 ? true:false;    
    this.chartBarValues.series[0].data[0] = parseFloat(this.thisPO.value.toFixed(2));
    //this.chartBarValues.plotOptions.bar.columnWidth = "15";
    var porcentajeTotalLiberado;
    porcentajeTotalLiberado = this.isRelease?this.thisPO.release[0].totalPercent:0;
    this.updatePOForm = this._formBuilder.group({
      po:  new FormControl(this.thisPO.reference), 
      poDate : new FormControl(this.thisPO.poDate.slice(0,10)),    
      smp: new FormControl(this.thisPO.site?.smp, [Validators.required]),  
      siteName: this.thisPO.site?.name,
      regionName: this.thisPO.site?.region,      
      scenery: this.thisPO.scenery,
      band:this.thisPO.band,
      onAir: this.thisPO.onAir?.date,
      valorPo:parseFloat(this.thisPO.value?.toFixed(2)),
      releases: porcentajeTotalLiberado,
      invoices: new FormArray([])        
    });    
    if(this.isInvoice){
      this.initFormInvoices(); 
    }
  }

  // initFormReleases():void{
  //   this.thisPO.release.forEach(element => {
  //     const refRelease = this.updatePOForm.get('releases') as FormArray;      
  //     var thisRelease = new FormGroup(
  //     {
  //       grDate: new FormControl(element.grDate),
  //       iaDate: new FormControl(element.iaDate),
  //       percent: new FormControl(element.percent),
  //       sgrNumber: new FormControl(element.sgrNumber),
  //     })
  //     refRelease.push(thisRelease);
      
  //   });
  // }

  initFormInvoices():void{
    var subtotalInvoices = 0;
    var subtotalIvaInvoices = 0;
    var amountUtilicedInvoices = 0;
    //console.log(this.thisPO);
    this.thisPO.invoice.forEach(element => {
      var statusPay = (!element.pay) ? false:true;
      var statusInvoice;
      subtotalInvoices += element.subTotal;
      subtotalIvaInvoices += element.subTotal;
      subtotalIvaInvoices += element.iva;
      subtotalIvaInvoices -= element.rtf;
      subtotalIvaInvoices -= element.rtIva;
      if(statusPay){
        amountUtilicedInvoices += element.pay.amountUtilized;
      }

      if(element.percentInvoice > 100){statusInvoice = "Error facturacion"}
      else if((Math.round(element.subTotal) != Math.round(this.thisPO.value*(element.percentInvoice/100)))&&(Math.round(element.subTotal)+1 != Math.round(this.thisPO.value*(element.percentInvoice/100)) && Math.round(element.subTotal)-1 != Math.round(this.thisPO.value*(element.percentInvoice/100)))){
        statusInvoice = "Error facturacion";
      }
      else if(!statusPay || element.pay.amountUtilized == 0){statusInvoice = "Por pagar"}
      else if(statusPay && Math.round(element.pay.amountUtilized) != Math.round(element.subTotal + element.iva - element.rtf - element.rtIva)){statusInvoice = "Error pago"}
      else{statusInvoice = "Pagado"}
// if(percentFacturado > 100){estado = 'Error facturacion';}
//           else if(valorPoFacturado != (valorPoTotal*percentFacturado/100)){estado = 'Error facturacion';}
//           else if(percentLiberado == 0){estado = 'Pendiente';}
//           else if(percentLiberado > percentFacturado){estado = 'Por facturar';}
//           else if(percentLiberado == percentFacturado && percentFacturado > percentPagado){estado = 'Por pagar';}          
//           else if(percentLiberado == percentPagado && percentLiberado == 100){estado = 'Finalizado';}
//           else if(percentLiberado == percentPagado && percentLiberado < 100){estado = 'Pendiente';}
//           else if(percentFacturado == percentPagado && valorPoFacturado != valorPoPagado){estado = 'Error pago';}

      const refInvoices = this.updatePOForm.get('invoices') as FormArray;      
      var thisInvoice = new FormGroup(
      {
        status: new FormControl(statusInvoice),
        date: new FormControl(element.date.slice(0,10)),
        invoice: new FormControl(element.invoice),
        subTotal: new FormControl(parseFloat(element.subTotal.toFixed(2))),
        iva: new FormControl(parseFloat(element.iva.toFixed(2))),
        rtIva: new FormControl(parseFloat(element.rtIva.toFixed(2))),
        rtf: new FormControl(parseFloat(element.rtf.toFixed(2))),
        percentInvoice: new FormControl(element.percentInvoice),
        documentNumber: new FormControl(statusPay ? element.pay.documentNumber : null),
        valorUtilizado: new FormControl(element.pay?.amountUtilized ? parseFloat(element.pay.amountUtilized.toFixed(2)) : null),
        financialCost: new FormControl(element.pay?.financialCost ? parseFloat(element.pay.financialCost.toFixed(2)) : null),
        totalPaid: new FormControl(element.pay?.totalPaid ? parseFloat(element.pay.totalPaid.toFixed(2)) : null),
        datePay: new FormControl(statusPay ? element.pay.datePay.slice(0,10) : null),

      })
      refInvoices.push(thisInvoice);      
    });
    this.chartBarValues.series[0].data[1] = parseFloat(subtotalInvoices.toFixed(2));
    this.chartBarValues.series[0].data[2] = parseFloat(subtotalIvaInvoices.toFixed(2));
    this.chartBarValues.series[0].data[3] = parseFloat(amountUtilicedInvoices.toFixed(2));
  }
  getCtrl(key:string, form:FormGroup):any{
    return form.get(key)
  }
  updatePO(){
    this.updatePOForm.value.payOrderId = this.thisPO.id;
    if(!this.updatePOForm.value.smp){
      this.updatePOForm.value.smp = this.thisPO.site?.mainSmp;
    }
    console.log("actuaizar PO value form");
    var date = Date.now()
    var thisDate = new Date(date);
    this.thisPO.poDate = this.updatePOForm.value.poDate+"T00:00:00.000Z";
    this.thisPO.site.smp = this.updatePOForm.value.smp;
    this.thisPO.site.name = this.updatePOForm.value.siteName;
    this.thisPO.site.region = this.updatePOForm.value.regionName;
    this.thisPO.scenery = this.updatePOForm.value.scenery;
    this.thisPO.band = this.updatePOForm.value.band;
    if(!this.thisPO.onAir){
      this.thisPO.onAir = new Object();
    }
    this.thisPO.onAir.date = this.updatePOForm.value.onAir;
    this.thisPO.value = this.updatePOForm.value.valorPo; 
    if(!this.thisPO.release[0]){
      this.thisPO.release[0] = new Object();
      this.thisPO.release[0].grDate = this.updatePOForm.value.poDate+"T00:00:00.000Z";
      this.thisPO.release[0].iaDate = this.updatePOForm.value.poDate+"T00:00:00.000Z";
      this.thisPO.release[0].proyect = this.updatePOForm.value.smp;
      this.thisPO.release[0].vendorSapName = this.updatePOForm.value.smp;
      this.thisPO.release[0].woName = this.updatePOForm.value.smp;
      this.thisPO.release[0].sgrNumber = this.updatePOForm.value.po;
    }   
    this.thisPO.release[0].totalPercent = this.updatePOForm.value.releases;
    if(this.updatePOForm.value.invoices){
      this.updatePOForm.value.invoices.forEach((element, index) => {        
        this.thisPO.invoice[index].date = element.date+"T00:00:00.000Z";
        this.thisPO.invoice[index].invoice = element.invoice;
        this.thisPO.invoice[index].percentInvoice = element.percentInvoice;
        this.thisPO.invoice[index].subTotal = element.subTotal;
        this.thisPO.invoice[index].iva = element.iva;
        this.thisPO.invoice[index].rtf = element.rtf;
        this.thisPO.invoice[index].rtIva = element.rtIva;
        this.thisPO.invoice[index].total = element.subTotal + element.iva;
        if(!this.thisPO.invoice[index].pay){
          this.thisPO.invoice[index].pay = new Object();
        }
        this.thisPO.invoice[index].pay.invoiceId = this.thisPO.invoice[index].id;
        this.thisPO.invoice[index].pay.documentNumber = element.documentNumber ? element.documentNumber : element.invoice;
        this.thisPO.invoice[index].pay.amountUtilized = element.valorUtilizado ? element.valorUtilizado : element.totalPaid-element.financialCost;
        this.thisPO.invoice[index].pay.financialCost = element.financialCost ? element.financialCost:0;
        this.thisPO.invoice[index].pay.totalPaid = element.totalPaid ? element.totalPaid : element.valorUtilizado+element.financialCost;
        this.thisPO.invoice[index].pay.datePay = element.datePay ? element.datePay+"T00:00:00.000Z": thisDate.toISOString();
        this.updatePOForm.value.invoices[index].pay = new Object();
        this.updatePOForm.value.invoices[index].pay.id = this.thisPO.invoice[index]?.pay?.id;
        this.updatePOForm.value.invoices[index].pay.invoiceId = this.thisPO.invoice[index]?.pay?.invoiceId;
        this.updatePOForm.value.invoices[index].pay.documentNumber = this.thisPO.invoice[index].pay.documentNumber;
        this.updatePOForm.value.invoices[index].pay.amountUtilized = this.thisPO.invoice[index].pay.amountUtilized;
        this.updatePOForm.value.invoices[index].pay.financialCost = this.thisPO.invoice[index].pay.financialCost;
        this.updatePOForm.value.invoices[index].pay.totalPaid = this.thisPO.invoice[index].pay.totalPaid;
        this.updatePOForm.value.invoices[index].pay.datePay = this.thisPO.invoice[index].pay.datePay;
      })
    }
    //console.log(this.updatePOForm.value);
    this._httpClient
    .post(
        variablesGlobales.urlBackend + '/production/update',
         {"valueUpdate": this.updatePOForm.value , "reference":this.thisPO.reference, "OldValue":this.thisPO}
    )
    .subscribe(
        (response:any) => {          
          this.thisPO.isChange = true;
          //console.log(response);
          this.dialogRef.close();
        },
        (error) => {
          console.log("updateError");
          console.log(error);
        }
    );
        
    
  }
}
