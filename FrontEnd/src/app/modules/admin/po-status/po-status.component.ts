import { Component, OnInit, ViewChild, Input, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators,} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import { ExporterService } from 'services/exporter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface transaction {
    smpId: string;
    nombreSitio:string;
    poId: string;
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
    
    this.cargueCompleto();}

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
            valorPo:[''],
            porcentajeLiberado:[''],
            porcentajePagado:['']
        });        
  }


  cargueCompleto(){
    // this.recentTransactionsTableColumns=['Fecha factura','Numero factura', 'Subtotal', 'Total factura', 'RTF', 'RTIVA','Total pagar', 'PO', 'SMP', 'Fecha pago', 'Sitio', 'Proyecto', 'Porcentaje factura'];
    this.recentTransactionsTableColumns=['SMP','SITE Name','PO','Escenario', 'Valor PO', '% Liberado','% Facturado', '% Pagado', 'ver PO' ,'Estado'];

    this._httpClient.post(variablesGlobales.urlBackend + '/production/', {})
      .subscribe((response:any) => {
        //console.log(response.result);
        this.listPO = response.result.reduce((acc, el)=>({
          ...acc, 
          [el.reference]:el,
        }),{}); 
        this.datosHoja = response.result.map(function(thisBill : any){
          //console.log(thisBill);
          var poLiberado = 0;
          var poFacturado = 0;
          var poPagado = 0;
          var estado = '';
          if(thisBill.release){
            var porcentajes = thisBill.release.map(thisRelease => thisRelease.percent);
            poLiberado = porcentajes.reduce((acc,valor)=>acc+valor,0);
          }
          
          if(thisBill.value >= 2000000){
              poFacturado = 50;
              poPagado = 20;
              estado = 'Liberado';
          }

          if(thisBill.value < 2000000 && thisBill.value >= 1000000){
              poFacturado = 100;
              poPagado = 50;
              estado = 'Por pagar';
          }

          if(thisBill.value < 1000000){
              poFacturado = 100;
              poPagado = 100;
              estado = 'Finalizado';
          }

          return {
            smpId: thisBill.site.smp,
            nombreSitio: thisBill.site.name,
            poId: thisBill.reference,
            escenario: thisBill.scenery,
            valorPo: thisBill.value,
            //instalacion: thisBill.instalation ? thisBill.instalation.date:'pendiente',
            porcentajeLiberado: poLiberado,
            porcentajeFacturado: poFacturado,
            porcentajePagado: poPagado,
            estado: estado
          }
        }); 
        this.recentTransactionsDataSource = new MatTableDataSource(this.datosHoja);
        this.recentTransactionsDataSource.paginator = this.paginator;        
              //this.updateGrafica1();
      },
      (error) => {console.log(error);}                
    );
  }
  toggleDrawerOpen(): void {this.drawerOpened = !this.drawerOpened;}
  drawerOpenedChanged(opened: boolean): void{this.drawerOpened = opened;}
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.recentTransactionsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.recentTransactionsDataSource.paginator) {
      this.recentTransactionsDataSource.paginator.firstPage();
    }
    //console.log($event);
  }
  exportAsXLSX():void{
    this.excelService.exportToExcel(this.recentTransactionsDataSource.filteredData, 'PO_status')
    console.log("descargando")
  }
  
  verPO(poId):void {
    // console.log("this PO: "+ poId);
    //console.log(this.listPO[poId]);
    this.thisPO = this.listPO[poId];
    //console.log("this PO: "+ JSON.stringify(this.thisPO));
    const dialogRef = this.dialog.open(PoStatusDialog,{
      data: this.thisPO
    });    
  }


  
}

@Component({
  selector: 'po-status-dialog',
  templateUrl: 'po-status-dialog.html',
})

//export class DialogAnimationsExampleDialog {
export class PoStatusDialog {
  updatePOForm: UntypedFormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public thisPO: any, private _formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
        /*construccion controles de formulario*/

        console.log(this.thisPO)
        this.updatePOForm = this._formBuilder.group({
          smp:this.thisPO.site.smp,  
          siteName: this.thisPO.site.name,
          po:this.thisPO.reference,
          valorPo:this.thisPO.value,
          escenario: this.thisPO.scenery,
          band:this.thisPO.band,
          lider: this.thisPO.leader ? this.thisPO.leader.name:"",
          onAir: {},
          nosHw: {},
          instalation:{},
          integration:{}
        });
      /*llamada a la función para cargar la info de prod desde el backend*/        
  }


  updatePO(){
    console.log("actuaizar  PO")
  }
}
