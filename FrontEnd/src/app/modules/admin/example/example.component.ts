import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { variablesGlobales } from 'GLOBAL';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit{
    /**
     * Constructor
     */
    // @ViewChild(MatAccordion) accordion: MatAccordion;
     private _data: BehaviorSubject<any> = new BehaviorSubject(null);
     recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
     recentTransactionsTableColumns: string[] = ['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];
     datosHoja: transaction[] =[];
     constructor (private _httpClient: HttpClient) {

    }

    ngOnInit(): void {
        this._httpClient
            .get(
                variablesGlobales.urlBackend + '/production/'
            )
            .subscribe(
                (response:any) => {
                    
                    for (let index = 0; index < response.result.length; index++) {
                        const element = response.result[index];
                        
                        this.datosHoja.push(  {SMP: element.site.smp, SITE_Name: element.site.name, Escenario:element.site.scenery, Banda:element.site.band, Lider:'Jesus Carrillo', Fecha_de_integracion:element.integration.date,ON_AIR:element.onAir.date, mos_HW:element.mosHw.date, PO:element.reference, Valor_PO :element.value, instalacion: element.instalation.date? element.instalation.date :'pendiente'},
                        );
                        console.log(this.datosHoja);
                    }
                   /* const datosHoja: transaction[] =[
                        {SMP:'SMP-WO-0139510',SITE_Name:'BOY.Puerto Boyaca', Escenario:'LTE700', Banda:'LTE700', Lider:'Jesus Carrillo', Fecha_de_integracion:'26/05/2022',ON_AIR:'21?06/2022', mos_HW:'09/05/2022', PO:'45619783', Valor_PO :'14935377', instalacion:' '},
                    ];*/
                    this.recentTransactionsDataSource.data = this.datosHoja;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
   filtrosBusqueda(strategy){
    var data=this.datosHoja;
    console.log(strategy);
    interface transaction {
        SMP: string;
        SITE_Name:string;
        Escenario: string;
        PO: string;
        Valor_PO: string;
    
    }
    var newData: transaction[] =[];
    
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        
        newData.push(  {SMP: element.SMP, SITE_Name: element.SITE_Name, Escenario:element.Escenario, PO:element.PO, Valor_PO :element.Valor_PO},
        );
        console.log(newData);
        this.recentTransactionsDataSource.data = newData;
    }
   }

   filtroSuma(){

   }
}
