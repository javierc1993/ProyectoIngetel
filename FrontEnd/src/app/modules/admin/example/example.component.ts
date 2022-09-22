import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { variablesGlobales } from 'GLOBAL';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';
import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
     filterForm: UntypedFormGroup;
     formFieldHelpers: UntypedFormGroup;
     private _data: BehaviorSubject<any> = new BehaviorSubject(null);
     recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
     recentTransactionsTableColumns: string[] = [];
     datosHoja: transaction[] =[];
     drawerOpened=false;
     drawerMode='side';
     range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        fechaDesdeInstalacion:new FormControl<Date | null>(null),
      });
     constructor (private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) { }

    ngOnInit(): void {
        /*construccion controles de formulario*/
        this.filterForm = this._formBuilder.group({
            SMP:[''],
            PO:[''],
            valorPO:[''],
            fechaDesdeInstalacion:[''],
            fechaHastaInstalacion:[''],
        });
      /*llamada a la función para cargar la info de prod desde el backend*/  
      this.cargueCompleto();
    }
    /*modificador de eventos despues de la carga de las vistas (paginador)*/
    ngAfterViewInit() {
        this.recentTransactionsDataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel="Cantidad";
      }
    /*funcion para traer la información*/
    cargueCompleto(){

        this.recentTransactionsTableColumns=['SMP','SITE Name', 'Escenario', 'Banda', 'Lider', 'Fecha de integracion','ON AIR', 'mos_HW', 'PO', 'Valor PO', 'instalacion'];
        this._httpClient
            .get(
                variablesGlobales.urlBackend + '/production/'
            )
            .subscribe(
                (response:any) => {
                    for (let index = 0; index < response.result.length; index++) {
                        const element = response.result[index];
                        console.log(Object.keys(element));
                        this.datosHoja.push(  {SMP: element.site.smp, SITE_Name: element.site.name, Escenario:element.scenery, Banda:element.band, Lider:'Jesus Carrillo', Fecha_de_integracion:element.integration.date,ON_AIR:element.onAir.date, mos_HW:element.mosHw.date, PO:element.reference, Valor_PO :element.value, instalacion: element.instalation.date? element.instalation.date :'pendiente'},
                        );
                    }
                    this.recentTransactionsDataSource.data = this.datosHoja;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
   perfilesVisualizacion(strategy){
    this.recentTransactionsTableColumns=['SMP','SITE Name', 'PO', 'Valor PO', 'Escenario'];
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
        this.recentTransactionsDataSource.data = newData;
    }
   }

   filtroSuma(){
   var  fechaDesde= this.filterForm.value.fechaDesdeInstalacion.format('MM/DD/YYYY');
   var formFiltros = {
    'SMP':this.filterForm.value.SMP,
    'PO':this.filterForm.value.PO,
    'valorPO':this.filterForm.value.valorPO,
    'fechaDesdeInstalacion':this.filterForm.value.fechaDesdeInstalacion.format('MM/DD/YYYY'),
    'fechaHastaInstalacion': this.filterForm.value.fechaHastaInstalacion.format('MM/DD/YYYY')

   };
    console.log(formFiltros);
   }
   toggleDrawerOpen(): void
{
    this.drawerOpened = !this.drawerOpened;
}
/**
 * Drawer opened changed
 *
 * @param opened
 */
 drawerOpenedChanged(opened: boolean): void
 {
     this.drawerOpened = opened;
 }

}
