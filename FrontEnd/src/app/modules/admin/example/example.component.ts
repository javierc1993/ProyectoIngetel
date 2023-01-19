import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { variablesGlobales } from 'GLOBAL';
import { BehaviorSubject} from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { ExporterService } from 'services/exporter.service';
import {UntypedFormBuilder, UntypedFormGroup,} from '@angular/forms';
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
    Valor_PO: number;
    instalacion: string;
    valorPoFacturado : number;    
    valorPoIva: number;
    valorPoPagado: number;
}
interface Operator {
    value: string;
    viewValue: string;
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
     sumPO=false;
     sumPOvalue =0;
     filterForm: UntypedFormGroup;
     formFieldHelpers: UntypedFormGroup;
     private _data: BehaviorSubject<any> = new BehaviorSubject(null);
     recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
     recentTransactionsTableColumns: string[] = [];
     datosHoja: transaction[]=[];
     valorTotalPO: number = 0;
     valorTotalFacturado: number = 0;
     valorTotalIva: number = 0;
     valorTotalPagado: number = 0;
     listPO: any;
     drawerOpened=false;
     drawerMode='side';
     range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        fechaDesdePoDate:new FormControl<Date | null>(null),
      });

    /*Inicializador de interfaz para filtros*/
    operators: Operator[] = [
        {value: 'igual', viewValue: 'igual'},
        {value: 'top', viewValue: 'mayor'},
        {value: 'button', viewValue: 'menor'}
      ];
    operatorsString: Operator[] = [
        {value: 'content', viewValue: 'contiene'},
        {value: 'noContent', viewValue: 'no contiene'}];

    /*constructor*/
    constructor (private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder,private excelService:ExporterService) {       
       const initDateBilling = this.getFilterLastYear();
       /*llamada a la función para cargar la info de prod desde el backend*/ 
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
        /*construccion controles de formulario*/
        this.filterForm = this._formBuilder.group({
            PO:[''],
            SMP:[''],            
            valorPO:[''],
            escenario:[''],
            fechaDesdePoDate:[''],
            fechaHastaPoDate:[''],
            operadorValorPO:[''],
            operadorPO:[''],
            operadorSitio:[''],
            operadorEscenario:['']
        });
    }
    
    /*funcion para traer la información*/
    getData(objectToFilter){     
        if(!objectToFilter){objectToFilter = this.getFilterLastYear();}
        this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];
        this._httpClient
            .post(variablesGlobales.urlBackend + '/production/',objectToFilter)
            .subscribe((response:any) => {
                this.listPO = response.result.reduce((acc, el)=>({
                  ...acc, 
                  [el.reference]:el,
                }),{}); 
                console.log(this.listPO);
                this.loadDataTable();  
                this.updateTotalValues();                  
            },
            (error) => {console.log(error);}
            );
    }
    loadDataTable(): void {
        this.datosHoja = Object.values(this.listPO).map(function(thisPO : any){
            var thisInstalationDate : any = 'Pendiente';
            var valorPoFacturado;
            var valorPoIva;
            var valorPoPagado;
            if(thisPO.instalation?.date){
                var thisDate = new Date(thisPO.instalation.date);
                thisInstalationDate = thisDate.getDate()+'/';     
                thisInstalationDate += (thisDate.getMonth() + 1)+'/';
                thisInstalationDate += thisDate.getFullYear();
            }
            if(thisPO.invoice){
                var valorFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.subTotal);
                var valorIva = thisPO.invoice.map(thisInvoice => thisInvoice.iva);                        
                var valorPagado = thisPO.invoice.map(function(thisInvoice:any){
                    if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.amountUtilized;}
                    else{return 0;}
                });
                valorPoFacturado = valorFacturado.reduce((acc,valor)=>acc+valor,0);
                valorPoIva = valorIva.reduce((acc,valor)=>acc+valor,0);
                valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0); 
            }
            
            return {
                SMP: thisPO.site?.smp, 
                SITE_Name: thisPO.site?.name, 
                Escenario:thisPO.scenery, 
                Banda:thisPO.band, 
                Lider:thisPO.leader?thisPO.leader.name+' '+thisPO.leader.lastname:'', 
                Fecha_de_integracion: thisPO.integration?.date,
                ON_AIR: thisPO.onAir?.date,
                mos_HW: thisPO.mosHw?.date,
                PO:thisPO.reference,
                Valor_PO :thisPO.value,
                instalacion: thisInstalationDate,
                valorPoFacturado,
                valorPoIva,
                valorPoPagado
            }
        });
        this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
        this.recentTransactionsDataSource.paginator = this.paginator;
    }

    updateTotalValues(){        
        this.valorTotalPO = 0;
        this.valorTotalFacturado = 0;
        this.valorTotalIva = 0;
        this.valorTotalPagado = 0;   
        this.recentTransactionsDataSource.filteredData.forEach(element => {
          this.valorTotalPO += element.Valor_PO;
          this.valorTotalFacturado += element.valorPoFacturado;
          this.valorTotalIva += element.valorPoIva;
          this.valorTotalPagado += element.valorPoPagado;
        });
        this.valorTotalPO = parseFloat(this.valorTotalPO.toFixed(2));
        this.valorTotalFacturado = parseFloat(this.valorTotalFacturado.toFixed(2));
        this.valorTotalIva = parseFloat(this.valorTotalIva.toFixed(2));
        this.valorTotalPagado = parseFloat(this.valorTotalPagado.toFixed(2));
    }

    /**
     * funcion para seleccionar los
     * perfiles de visualizacion
     * @param strategy 
     */
   perfilesVisualizacion(strategy){
    if(strategy == "production"){
        this.recentTransactionsTableColumns=['SMP','SITE Name', 'PO', 'Valor PO', 'Escenario'];
        interface transaction {
            SMP: string;
            SITE_Name:string;        
            PO: string;
            Valor_PO: string;
            Escenario: string;
            valorPoFacturado : number;    
            valorPoIva: number;
            valorPoPagado: number;    
        }
        var newData: transaction[] =[]; 
        newData = Object.values(this.listPO).map(function(thisPO : any){
            var valorPoFacturado;
            var valorPoIva;
            var valorPoPagado;
            if(thisPO.invoice){
                var valorFacturado = thisPO.invoice.map(thisInvoice => thisInvoice.subTotal);
                var valorIva = thisPO.invoice.map(thisInvoice => thisInvoice.iva);                        
                var valorPagado = thisPO.invoice.map(function(thisInvoice:any){
                    if(thisInvoice.pay && thisInvoice.pay.createdAt){return thisInvoice.pay.amountUtilized;}
                    else{return 0;}
                });
                valorPoFacturado = valorFacturado.reduce((acc,valor)=>acc+valor,0);
                valorPoIva = valorIva.reduce((acc,valor)=>acc+valor,0);
                valorPoPagado = valorPagado.reduce((acc,valor)=>acc+valor,0); 
            }
            return {
                SMP: thisPO.site?.smp, 
                SITE_Name: thisPO.site?.name, 
                PO:thisPO.reference,
                Valor_PO :thisPO.value,
                Escenario:thisPO.scenery,
                valorPoFacturado,
                valorPoIva,
                valorPoPagado
            }
        });
        this.recentTransactionsDataSource = new MatTableDataSource(newData);
        this.recentTransactionsDataSource.paginator = this.paginator;
    }else{
        this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];
        this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
        this.recentTransactionsDataSource.paginator = this.paginator;
    }
    
    //this.recentTransactionsDataSource.data = newData;    
   }

   getDataFilter(){
    if(this.filterForm.value.fechaDesdePoDate){
      this.filterForm.value.fechaDesdePoDate = this.filterForm.value.fechaDesdePoDate.format('DD/MM/YYYY');
    };
    if(this.filterForm.value.fechaHastaPoDate){
      this.filterForm.value.fechaHastaPoDate = this.filterForm.value.fechaHastaPoDate.format('DD/MM/YYYY');
    };
    if(!this.filterForm.value.PO){this.filterForm.value.operadorPO = ""}
    if(!this.filterForm.value.SMP){this.filterForm.value.operadorSitio = ""}
    if(!this.filterForm.value.valorPO){this.filterForm.value.operadorValorPO = null}
    if(!this.filterForm.value.escenario){this.filterForm.value.operadorEscenario = ""}
    this.getData(this.filterForm.value);

   }
   
   toggleDrawerOpen(): void{this.drawerOpened = !this.drawerOpened;}
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
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'Produccion_status')
  }

}
