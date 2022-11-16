import { Component, OnInit, ViewChild, Input, Inject, ViewEncapsulation, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexPlotOptions, ApexDataLabels, ApexLegend, ApexGrid} from "ng-apexcharts";
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormGroup, FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExporterService } from 'services/exporter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface transaction {
    smp: string;
    nombreSitio:string;
    po: string;
    poDate: Date;
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
  listPO: any;
  thisPO: any;
  drawerOpened=false;
  drawerMode='side';

  constructor(private _httpClient: HttpClient, private _formBuilder: UntypedFormBuilder, private excelService:ExporterService, public dialog: MatDialog) { 
    this.recentTransactionsTableColumns=['SMP','SITE Name','PO','poDate','Escenario', 'Valor PO', '% Liberado','% Facturado', '% Pagado', 'ver PO' ,'Estado'];
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
            SMP:[''],
            // sitio:[''],
            fechaDesdePoDate:[''],
            fechaHastaPoDate:[''],
        });        
  }

  getData(objectToFilter){
    //console.log("cargando el componente billing status: "+(objectToFilter));
    this._httpClient.post(variablesGlobales.urlBackend + '/production/', objectToFilter)
      .subscribe((response:any) => {
        // console.log(response.result);
        this.listPO = response.result.reduce((acc, el)=>({
          ...acc, 
          [el.reference]:el,
        }),{});         
        console.log(this.listPO);
        this.loadDataTable();
      },
      (error) => {console.log(error);}                
    );
  }

  loadDataTable(): void {
    this.datosHoja = Object.values(this.listPO).map(function(thisBill : any){
          //console.log(thisBill);
          var percentLiberado;
          var percentFacturado;
          var percentPagado;
          var valorPoTotal = thisBill.value;
          var valorPoFacturado;
          var valorPoIva;
          var valorPoPagado;
          var estado;

          percentLiberado = thisBill.release[0] ? thisBill.release[0].totalPercent:0;   
          var fechaPo = new Date(thisBill.poDate);  
          fechaPo = new Date (fechaPo.getTime() + (3600000 * 5) );
          
          if(thisBill.invoice){
            var porcentajeFacturado = thisBill.invoice.map(thisInvoice => thisInvoice.percentInvoice);
            var valorFacturado = thisBill.invoice.map(thisInvoice => thisInvoice.subTotal);
            var valorIva = thisBill.invoice.map(thisInvoice => thisInvoice.iva);
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
            percentPagado = porcentajePagado.reduce((acc,valor)=>acc+valor,0);
            valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0);            
          }         
          
          if(percentFacturado > 100){estado = 'Error facturacion';}
          else if(valorPoFacturado != (valorPoTotal*percentFacturado/100)){estado = 'Error facturacion';}
          else if(percentLiberado == 0){estado = 'Pendiente';}
          else if(percentLiberado > percentFacturado){estado = 'Liberado';}
          else if(percentLiberado == percentFacturado && percentFacturado > percentPagado){estado = 'Por pagar';}          
          else if(percentLiberado == percentPagado && percentLiberado == 100 && Math.trunc(valorPoFacturado + valorPoIva) == Math.trunc(valorPoPagado)){estado = 'Finalizado';}
          else if(percentLiberado == percentPagado && percentLiberado < 100){estado = 'Pendiente';}
          else if(percentFacturado == percentPagado && Math.trunc(valorPoFacturado + valorPoIva) != Math.trunc(valorPoPagado)){estado = 'Error pago';}
          else if(percentFacturado > percentLiberado){estado = 'Por liberar';}

          return {
            smp: thisBill.site.smp,
            nombreSitio: thisBill.site.name,
            po: thisBill.reference,
            poDate : fechaPo,
            escenario: thisBill.scenery,
            valorPo: thisBill.value,
            //instalacion: thisBill.instalation ? thisBill.instalation.date:'pendiente',
            porcentajeLiberado: percentLiberado,
            porcentajeFacturado: percentFacturado,
            porcentajePagado: percentPagado,
            estado: estado
          }
        });         
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
  }
  exportAsXLSX():void{
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'PO_status')
    console.log("descargando")
  }

  getDataFilter(){
    //console.log("value to filter:"+JSON.stringify(this.filterForm.value));
    if(this.filterForm.value.fechaDesdePoDate){
      this.filterForm.value.fechaDesdePoDate = this.filterForm.value.fechaDesdePoDate.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaPoDate){
      this.filterForm.value.fechaHastaPoDate = this.filterForm.value.fechaHastaPoDate.format('DD/MM/YYYY');
    };
    this.getData(this.filterForm.value);
  }
  
  verPO(po, statusPO):void {
    this.thisPO = this.listPO[po];
    this.thisPO.status =  statusPO;  
    const dialogRef = this.dialog.open(PoStatusDialog,{
      data: this.thisPO
    });    
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');  
      this.loadDataTable();   
    });
  }
  
  
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels:ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
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
  // @Output()
  // poID: EventEmitter<any> = new EventEmitter<any>();
  // invoices: any;
  // payments: any;
  constructor(private _httpClient: HttpClient ,public dialogRef: MatDialogRef<PoStatusDialog>, @Inject(MAT_DIALOG_DATA) public thisPO: any, private _formBuilder: UntypedFormBuilder) {
    this.chartBarValues = {
      
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "15",
          distributed: true
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
        categories: ["Valor PO", "Valor facturado",  "Faturado + iva",  "Valor pagado"]
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
    this.isRelease = this.thisPO.release.length >= 1 ? true:false;
    this.isInvoice = this.thisPO.invoice.length >= 1 ? true:false;    
    this.chartBarValues.series[0].data[0] = this.thisPO.value;
    //this.chartBarValues.plotOptions.bar.columnWidth = "15";
    var porcentajeTotalLiberado;
    porcentajeTotalLiberado = this.isRelease?this.thisPO.release[0].totalPercent:0;
    
    console.log(this.thisPO); 
    this.updatePOForm = this._formBuilder.group({
      po:  new FormControl(this.thisPO.reference), 
      poDate : new FormControl(this.thisPO.poDate.slice(0,10)),    
      smp: new FormControl(this.thisPO.site.smp, [Validators.required]),  
      siteName: this.thisPO.site.name,
      regionName: this.thisPO.site.region,      
      scenery: this.thisPO.scenery,
      band:this.thisPO.band,
      onAir: this.thisPO.onAir ? this.thisPO.onAir.date : null,
      valorPo:this.thisPO.value,
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
    this.thisPO.invoice.forEach(element => {
      var statusPay = (!element.pay) ? false:true;
      var statusInvoice;
      this.chartBarValues.series[0].data[1] += element.subTotal;
      this.chartBarValues.series[0].data[2] += element.subTotal;
      this.chartBarValues.series[0].data[2] += element.iva;
      if(statusPay){
        this.chartBarValues.series[0].data[3] += element.pay.amountUtilized;
      }

      if(element.percentInvoice > 100){statusInvoice = "Error facturacion"}
      else if(element.subTotal != (this.thisPO.value*(element.percentInvoice/100))){statusInvoice = "Error facturacion"}
      else if(!statusPay || element.pay.amountUtilized == 0){statusInvoice = "Por pagar"}
      else if(statusPay && Math.trunc(element.pay.amountUtilized) != Math.trunc(element.subTotal + element.iva)){statusInvoice = "Error pago"}
      else{statusInvoice = "Pagado"}
// if(percentFacturado > 100){estado = 'Error facturacion';}
//           else if(valorPoFacturado != (valorPoTotal*percentFacturado/100)){estado = 'Error facturacion';}
//           else if(percentLiberado == 0){estado = 'Pendiente';}
//           else if(percentLiberado > percentFacturado){estado = 'Liberado';}
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
        subTotal: new FormControl(element.subTotal),
        iva: new FormControl(element.iva),
        rtIva: new FormControl(element.rtIva),
        rtf: new FormControl(element.rtf),
        percentInvoice: new FormControl(element.percentInvoice),
        documentNumber: new FormControl(statusPay ? element.pay.documentNumber : null),
        valorUtilizado: new FormControl(statusPay ? element.pay.amountUtilized : null),
        financialCost: new FormControl(statusPay ? element.pay.financialCost : null),
        totalPaid: new FormControl(statusPay ? element.pay.totalPaid : null),
        datePay: new FormControl(statusPay ? element.pay.datePay.slice(0,10) : null),

      })
      refInvoices.push(thisInvoice);
      
    });
  }

  getCtrl(key:string, form:FormGroup):any{
    return form.get(key)
  }

  
  updatePO(){
    console.log("actuaizar  PO");
    //console.log(this.updatePOForm.value)
    var date = Date.now()
    var thisDate = new Date(date);
    this.thisPO.poDate = this.updatePOForm.value.poDate+"T00:00:00.000Z";
    this.thisPO.site.smp = this.updatePOForm.value.smp;
    this.thisPO.site.name = this.updatePOForm.value.regionName;
    this.thisPO.site.region = this.updatePOForm.value.regionName;
    this.thisPO.scenery = this.updatePOForm.value.scenery;
    this.thisPO.band = this.updatePOForm.value.band;
    this.thisPO.onAir.date = this.updatePOForm.value.onAir;
    this.thisPO.value = this.updatePOForm.value.valorPo;
    this.thisPO.release[0].totalPercent = this.updatePOForm.value.releases;
    if(this.updatePOForm.value.invoices){
      var index = 0;
      this.updatePOForm.value.invoices.forEach((element, index) => {
        this.thisPO.invoice[index].date = element.date+"T00:00:00.000Z";
        this.thisPO.invoice[index].invoice = element.invoice;
        this.thisPO.invoice[index].percentInvoice = element.percentInvoice;
        this.thisPO.invoice[index].subTotal = element.subTotal;
        this.thisPO.invoice[index].iva = element.iva;
        this.thisPO.invoice[index].rtf = element.rtf;
        this.thisPO.invoice[index].rtIva = element.rtIva;
        this.thisPO.invoice[index].subTotal = element.subTotal;

        if(!this.thisPO.invoice[index].pay){
          this.thisPO.invoice[index].pay = new Object();
        }
        this.thisPO.invoice[index].pay.documentNumber = element.documentNumber ? element.documentNumber : element.invoice;
        this.thisPO.invoice[index].pay.amountUtilized = element.valorUtilizado ? element.valorUtilizado : element.totalPaid-element.financialCost;
        this.thisPO.invoice[index].pay.financialCost = element.financialCost ? element.financialCost:0;
        this.thisPO.invoice[index].pay.totalPaid = element.totalPaid ? element.totalPaid : element.valorUtilizado+element.financialCost;
        this.thisPO.invoice[index].pay.datePay = element.datePay ? element.datePay+"T00:00:00.000Z": thisDate.toISOString();
      })
    }
     console.log(this.thisPO);
    // this.poID.emit(this.updatePOForm.value.po);
    this._httpClient
    .post(
        variablesGlobales.urlBackend + '/production/update',
         {"valueUpdate": this.updatePOForm.value , "reference":this.thisPO.reference, "OldValue":this.thisPO}
    )
    .subscribe(
        (response:any) => {
          console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
    this.dialogRef.close();    
    
  }
}
