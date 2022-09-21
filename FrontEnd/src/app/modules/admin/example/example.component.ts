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
     constructor (private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) {
        
        
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            SMP:[''],
            PO:[''],
            valorPO:[''],
            fechaDesdeInstalacion:[''],
            fechaHastaInstalacion:[''],
        });
        this.range = new FormGroup({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null),
            fechaDesdeInstalacion:new FormControl<Date | null>(null),
          });
      this.cargueCompleto();
    }
    ngAfterViewInit() {
        this.recentTransactionsDataSource.paginator = this.paginator;
      }
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
                        
                        this.datosHoja.push(  {SMP: element.site.smp, SITE_Name: element.site.name, Escenario:element.scenery, Banda:element.band, Lider:'Jesus Carrillo', Fecha_de_integracion:element.integration.date,ON_AIR:element.onAir.date, mos_HW:element.mosHw.date, PO:element.reference, Valor_PO :element.value, instalacion: element.instalation.date? element.instalation.date :'pendiente'},
                        );
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
        console.log(newData);
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
