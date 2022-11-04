import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";
import { variablesGlobales } from 'GLOBAL';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface transaction {  
    valorPO: string;
    instalacion: string;
    porcentajeTotalLiberado: number;
    porcentajeTotalFacturado : number;
    valorPoFacturado : number;
    valorPoIva: number;
    porcentajeTotalPagado: number;
    valorPoPagado: number;
    estadoPO: string;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
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
  public chartOptions: Partial<ChartOptions>;
  public instalationPO: Partial<instalationPO>;
  public statusPO: Partial<statusPO>;
  datosHoja : transaction[] = [];

  constructor(private _httpClient: HttpClient) {     
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Pendiente Definicion"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
    this.instalationPO = {
      series: [0, 0, 0],
      chart: {    
        height: 350,    
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C"],
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
      series: [43, 22, 25],
      chart: {    
        height: 350,    
        type: "donut"
      },
      labels: ["Pagadas", "Pendientes pago", "Pendientes cobro"],
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
  }

  ngOnInit(): void {
   this.cargueCompleto();
  }

  ngAfterViewInit(): void {    
  }

  cargueCompleto (): void{
    this._httpClient.post(variablesGlobales.urlBackend + '/production/',{})
    .subscribe(
      (response:any) => {         
        this.clearData(response.result);
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
      if(thisPO.release){
        var porcentajes = thisPO.release.map(thisRelease => thisRelease.percent);
        porcentajeTotalLiberado = porcentajes.reduce((acc,valor)=>acc+valor,0);
      } 
      if(thisPO.invoice){
        var porcentajeFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.percentInvoice);
        var valorFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.subTotal);
        var valorIva = thisPO.invoice.map(thisInvoice => thisInvoice.iva);
        var porcentajePagado = thisPO.invoice.map(function(thisInvoice:any){
            if(thisInvoice.pay && thisInvoice.pay.createdAt && thisInvoice.pay.totalPaid > 0){return thisInvoice.percentInvoice;}
            else{return 0;}
        });          
        var valorPagado = thisPO.invoice.map(function(thisInvoice:any){
            //if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.amountUtilized;}
            if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.totalPaid;}
            else{return 0;}
        });
        porcentajeTotalFacturado = porcentajeFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoFacturado = valorFacturado.reduce((acc,valor)=>acc+valor,0);
        valorPoIva = valorIva.reduce((acc,valor)=>acc+valor,0);
        porcentajeTotalPagado = porcentajePagado.reduce((acc,valor)=>acc+valor,0);
        valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0); 
      }

      if(porcentajeTotalFacturado > 100){estadoPO = 'Error facturacion';}
      else if(valorPoFacturado != (valorTotalPo*porcentajeTotalFacturado/100)){estadoPO = 'Error facturacion';}
      else if(porcentajeTotalLiberado == 0){estadoPO = 'Pendiente';}
      else if(porcentajeTotalLiberado > porcentajeTotalFacturado){estadoPO = 'Liberado';}
      else if(porcentajeTotalLiberado == porcentajeTotalFacturado && porcentajeTotalFacturado > porcentajeTotalPagado){estadoPO = 'Por pagar';}          
      else if(porcentajeTotalLiberado == porcentajeTotalPagado && porcentajeTotalLiberado == 100 && Math.trunc(valorPoFacturado + valorPoIva) == Math.trunc(valorPoPagado)){estadoPO = 'Finalizado';}
      else if(porcentajeTotalLiberado == porcentajeTotalPagado && porcentajeTotalLiberado < 100){estadoPO = 'Pendiente';}
      else if(porcentajeTotalFacturado == porcentajeTotalPagado && Math.trunc(valorPoFacturado + valorPoIva) != Math.trunc(valorPoPagado)){estadoPO = 'Error pago';}
      else if(porcentajeTotalFacturado > porcentajeTotalLiberado){estadoPO = 'Por liberar';}

      return {
        valorPO: thisPO.value,
        instalacion: thisPO.instalation.date? thisPO.instalation.date :'pendiente',
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
    console.log(this.datosHoja);
    dataSeries.push(quantityPending.length)
    dataSeries.push(quantityInstalling.length)
    this.instalationPO.series = dataSeries;
    this.instalationPO.labels = dataLabels;        
  } 
  updateStatusPO(){
    var dataSeries = new Array();
    var dataLabels = ['Error facturacion', 'Pendiente', 'Liberado', 'Por pagar', 'Finalizado', 'Error pago', 'Por liberar'];
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
    //console.log(this.datosHoja);
    dataSeries.push(quantityErrorFacturacion.length);
    dataSeries.push(quantityPendiente.length);
    dataSeries.push(quantityLiberado.length);
    dataSeries.push(quantityPorPagar.length);
    dataSeries.push(quantityFinalizado.length);
    dataSeries.push(quantityErrorPago.length);
    dataSeries.push(quantityPorLiberar.length);
    this.statusPO.series = dataSeries;
    this.statusPO.labels = dataLabels; 
  } 
}
