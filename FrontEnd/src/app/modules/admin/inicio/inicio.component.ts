import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive, ApexDataLabels, ApexPlotOptions, ApexGrid, ApexLegend} from "ng-apexcharts";
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { variablesGlobales } from 'GLOBAL';
import { HttpClient } from '@angular/common/http';


export interface transaction {  
    valorPO: number;
    instalacion: string;
    porcentajeTotalLiberado: number;
    porcentajeTotalFacturado : number;
    valorPoFacturado : number;
    valorPoIva: number;
    porcentajeTotalPagado: number;
    valorPoPagado: number;
    estadoPO: string;
}

export type optionsValuesPO = {
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

export type instalationPO = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

export type statusPO = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: any[];
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {
  
  
  //recentTransactionsTableColumns: string[] = [];
  
  @ViewChild("chart") chart: ChartComponent;
  filterForm: UntypedFormGroup;
  formFieldHelpers: UntypedFormGroup;
  public optionsValuesPO: Partial<optionsValuesPO>;
  public instalationPO: Partial<instalationPO>;
  public statusPO: Partial<statusPO>;
  datosHoja : transaction[] = [];
  valorTotalPO: number = 0;
  valorTotalFacturado: number = 0;
  valorTotalIva: number = 0;
  valorTotalPagado: number = 0;
  initDateBilling;

  constructor(private _httpClient: HttpClient, private _formBuilder: UntypedFormBuilder) {     
    this.optionsValuesPO = {
      
      chart: {
        height: 350,
        type: "bar"
      },
      dataLabels:{
          enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: "40",
          dataLabels: {
              position: 'top', // top, center, bottom
          },
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            const numero = value.toLocaleString("en");
            return "$ "+numero;
          }
        },
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
        categories: ["Valor PO", "Valor facturado", "IVA",  "Faturado + IVA",  "Valor pagado"]
      },
      series: [
        {
          name: "Valor",
          data: [0, 0, 0, 0, 0]
        }
      ]
      
    };

    this.instalationPO = {
      series: [0, 0],
      chart: {    
        height: 350,    
        type: "pie"
      },
      labels: ['pendiente', 'instalado'],
      responsive: [
        {
          breakpoint: 480,
          options: {            
            legend: {
              position: "rigth"
            }
          }
        }
      ],
      title: {
        text: "PO instaladas"
      }
      
    };
    this.statusPO = {
      series: [0, 0, 0, 0, 0, 0, 0],
      chart: {    
        height: 350,    
        type: "donut"
      },
      labels: ['Error facturacion', 'Pendiente', 'Liberado', 'Por pagar', 'Finalizado', 'Error pago', 'Por liberar'],
      colors:['#DF2222', '#00CFB9', '#F6A26C', '#0800FF', '#00CF5B', '#FD5648', '#FFC636'],
      responsive: [
        {
          breakpoint: 480,
          options: {            
            legend: {
              position: "rigth"
            }
          }
        }
      ],
      title: {
        text: "PO estados"
      }
    };
    this.initDateBilling = this.getFilterLastYear();
    this.getData(this.initDateBilling);
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
      fechaDesdePoDate:[''],
      fechaHastaPoDate:[''],
    }); 
   
  }

  ngAfterViewInit(): void {    
  }

  getData(objectToFilter){
    this._httpClient.post(variablesGlobales.urlBackend + '/production/',objectToFilter)
    .subscribe(
      (response:any) => {         
        this.clearData(response.result); 
        this.updateTotalValues();
        this.updateInstalationPO();
        this.updateStatusPO();       
      },
      (error) => {console.log(error);}                
    );                
  }
  clearData(dataPO){
    this.datosHoja = dataPO.map(function(thisPO){  
      var porcentajeTotalLiberado;
      var porcentajeTotalFacturado;
      var porcentajeTotalPagado;
      var valorTotalPo = thisPO.value;
      var valorPoFacturado;
      var valorPoIva;
      var valorPoPagado;
      var estadoPO;
      if(thisPO.release[0]){
        // var porcentajes = thisPO.release.map(thisRelease => thisRelease.percent);
        // porcentajeTotalLiberado = porcentajes.reduce((acc,valor)=>acc+valor,0);
        porcentajeTotalLiberado = thisPO.release[0].totalPercent;
      }else{porcentajeTotalLiberado=0;} 
      if(thisPO.invoice){
        var porcentajeFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.percentInvoice);
        var valorFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.subTotal);
        var valorIva = thisPO.invoice.map(thisInvoice => thisInvoice.iva);
        var porcentajePagado = thisPO.invoice.map(function(thisInvoice:any){
            if(thisInvoice.pay && thisInvoice.pay.createdAt && thisInvoice.pay.amountUtilized > 0){return thisInvoice.percentInvoice;}
            else{return 0;}
        });          
        var valorPagado = thisPO.invoice.map(function(thisInvoice:any){
            if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.amountUtilized;}
            else{return 0;}
        });
        porcentajeTotalFacturado = porcentajeFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoFacturado = valorFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoIva = valorIva.reduce((acc,valor)=>acc+valor,0);
        porcentajeTotalPagado = porcentajePagado.reduce((acc,valor)=>acc+valor,0);
        valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0); 
      }

      if(porcentajeTotalFacturado > 100){estadoPO = 'Error facturacion';}
      else if((Math.round(valorPoFacturado) != Math.round(valorTotalPo*porcentajeTotalFacturado/100))&&(Math.round(valorPoFacturado)+1 != Math.round(valorTotalPo*porcentajeTotalFacturado/100) && Math.round(valorPoFacturado)-1 != Math.round(valorTotalPo*porcentajeTotalFacturado/100))){
        estadoPO = 'Error facturacion';
      }
      //else if(porcentajeTotalLiberado == 0){estadoPO = 'Pendiente';}
      else if(porcentajeTotalLiberado > porcentajeTotalFacturado){estadoPO = 'Liberado';}
      else if(porcentajeTotalLiberado == porcentajeTotalFacturado && porcentajeTotalFacturado > porcentajeTotalPagado){estadoPO = 'Por pagar';}          
      else if(porcentajeTotalLiberado == porcentajeTotalPagado && porcentajeTotalLiberado == 100 && Math.round(valorPoFacturado + valorPoIva) == Math.round(valorPoPagado)){estadoPO = 'Finalizado';}
      else if(porcentajeTotalLiberado == porcentajeTotalPagado && porcentajeTotalLiberado < 100){estadoPO = 'Pendiente';}
      else if(porcentajeTotalFacturado == porcentajeTotalPagado && Math.round(valorPoFacturado + valorPoIva) != Math.round(valorPoPagado)){estadoPO = 'Error pago';}
      else if(porcentajeTotalFacturado > porcentajeTotalLiberado){estadoPO = 'Por liberar';}

      return {
        valorPO: thisPO.value,
        instalacion: thisPO.instalation?.date ? thisPO.instalation.date :'pendiente',
        porcentajeTotalLiberado,
        porcentajeTotalFacturado,
        valorPoFacturado,
        valorPoIva,
        porcentajeTotalPagado,
        valorPoPagado,
        estadoPO,
      }
    });
  }
  updateInstalationPO(){
    var dataSeries = new Array();
    var dataLabels = ['pendiente', 'instalado'];
    var quantityPending = new Array;
    var quantityInstalling = new Array;
    this.datosHoja.map (function(thisPO){
        if(thisPO.instalacion != 'pendiente'){quantityInstalling.push(thisPO.instalacion)}
        else{quantityPending.push(thisPO.instalacion)}
    })
    dataSeries.push(quantityPending.length)
    dataSeries.push(quantityInstalling.length)
    this.instalationPO.series = dataSeries;
    this.instalationPO.labels = dataLabels;        
  } 
  updateStatusPO(){
    var dataSeries = new Array();
    var quantityErrorFacturacion = new Array;
    var quantityPendiente = new Array;
    var quantityLiberado = new Array;
    var quantityPorPagar = new Array;
    var quantityFinalizado = new Array;
    var quantityErrorPago = new Array;
    var quantityPorLiberar = new Array;
      
    this.datosHoja.map (function(thisPO){
      switch(thisPO.estadoPO){
        case 'Error facturacion':
          quantityErrorFacturacion.push(thisPO.estadoPO);
        break;
        case 'Pendiente':
          quantityPendiente.push(thisPO.estadoPO);
        break;
        case 'Liberado':
          quantityLiberado.push(thisPO.estadoPO);
        break;
        case 'Por pagar':
          quantityPorPagar.push(thisPO.estadoPO);
        break;
        case 'Finalizado':
          quantityFinalizado.push(thisPO.estadoPO);
        break;
        case 'Error pago':
          quantityErrorPago.push(thisPO.estadoPO);
        break;
        case 'Por liberar':
          quantityPorLiberar.push(thisPO.estadoPO);
        break;
        default:
      }       
    })
    dataSeries.push(quantityErrorFacturacion.length);
    dataSeries.push(quantityPendiente.length);
    dataSeries.push(quantityLiberado.length);
    dataSeries.push(quantityPorPagar.length);
    dataSeries.push(quantityFinalizado.length);
    dataSeries.push(quantityErrorPago.length);
    dataSeries.push(quantityPorLiberar.length);
    this.statusPO.series = dataSeries;
  } 

  updateTotalValues(){
    this.valorTotalPO = 0;
    this.valorTotalFacturado = 0;
    this.valorTotalIva = 0;
    this.valorTotalPagado = 0;   
    this.datosHoja.forEach(element => {
      this.valorTotalPO += element.valorPO;
      this.valorTotalFacturado += element.valorPoFacturado;
      this.valorTotalIva += element.valorPoIva;
      this.valorTotalPagado += element.valorPoPagado;
    });
    this.valorTotalPO = parseFloat(this.valorTotalPO.toFixed(2));
    this.valorTotalFacturado = parseFloat(this.valorTotalFacturado.toFixed(2));
    this.valorTotalIva = parseFloat(this.valorTotalIva.toFixed(2));
    this.valorTotalPagado = parseFloat(this.valorTotalPagado.toFixed(2));
    this.optionsValuesPO.series = [{
      data: [this.valorTotalPO, this.valorTotalFacturado, this.valorTotalIva, parseFloat((this.valorTotalFacturado + this.valorTotalIva).toFixed(2)), this.valorTotalPagado]
    }];  
  }

  getDataFilter(){    
    if(this.filterForm.value.fechaDesdePoDate){
      this.filterForm.value.fechaDesdePoDate = this.filterForm.value.fechaDesdePoDate.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaPoDate){
      this.filterForm.value.fechaHastaPoDate = this.filterForm.value.fechaHastaPoDate.format('DD/MM/YYYY');
    };
    this.getData(this.filterForm.value);
  }
}
