import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";
import { variablesGlobales } from 'GLOBAL';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface transaction {
    SMP: string;
    SITE_Name:string;
    Escenario: string;
    Banda: string;
    Lider: string;
    Fecha_de_integracion: string;
    ON_AIR:string;
    mos_HW: string;
    PO: string;
    Valor_PO: string;
    instalacion: string;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type Grafica1Options = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

export type Grafica2Options = {
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
  public Grafica1Options: Partial<Grafica1Options>;
  public Grafica2Options: Partial<Grafica1Options>;
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

    this.Grafica1Options = {
      series: [44, 55, 13, 43, 22],
      chart: {    
        height: 350,    
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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

    this.Grafica2Options = {
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
        text: "PO pagadas"
      }
    };
    // this.updateGrafica1();
  }

  ngOnInit(): void {
    //console.log();
    this.cargueCompleto();
  }

  ngAfterViewInit(): void {
    
  }

  cargueCompleto (): void{

        // this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];
        this._httpClient
            .get(
                variablesGlobales.urlBackend + '/production/'
            )
            .subscribe(
                (response:any) => {
                    
                  this.datosHoja = response.result.map(function(thisPO){
                    //console.log(thisPO);
                    return {
                      SMP: thisPO.site.smp,
                      SITE_Name: thisPO.site.name,
                      Escenario: thisPO.scenery,
                      Banda: thisPO.band,
                      Lider: 'Jesus Carrillo',
                      Fecha_de_integracion: thisPO.integration.date,
                      ON_AIR:thisPO.onAir.date,
                      mos_HW: thisPO.mosHw.date,
                      PO: thisPO.reference,
                      Valor_PO: thisPO.value,
                      instalacion: thisPO.instalation.date? thisPO.instalation.date :'pendiente'}
                  });                  
                  this.updateGrafica1();
                },
                (error) => {
                    console.log(error);
                }                
            );            
    }
    updateGrafica1(){
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
      this.Grafica1Options.series = dataSeries;
      this.Grafica1Options.labels = dataLabels;
        
    }
    // updateGrafica2(){

    // }

}
