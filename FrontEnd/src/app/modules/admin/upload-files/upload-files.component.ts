import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uploadFileService } from './uploadFile.services';
import { catchError } from 'rxjs';
import { FuseAlertService } from '@fuse/components/alert';
import { ExporterService } from 'services/exporter.service';
import { LocalizedString } from '@angular/compiler';

export interface transaction {
    factura:string;   
    estado:string;  
}

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadFilesComponent implements OnInit {
    uploadForm!: FormGroup;
    private fileTemp:any;
    dataExporter: transaction[]=[];

    constructor(
        //public fileType : String,
        private readonly fb: FormBuilder,
        private _httpClient: HttpClient,
        private uploadFileService: uploadFileService,
        private _fuseAlertService: FuseAlertService,
        private excelService:ExporterService
    ) {}

    ngOnInit(): void {
        this.uploadForm = this.initForm();
        
        // this.onPathValue();
        // this.onSetValue();
    }

    onSubmit(): void {
         this.sendFile();
    }

    getFile($event: any): void{
        const [ file ]= $event.target.files;
        this.fileTemp ={
            fileRaw:file,
            fileName:file.name
        }        
        // console.log(this.fileTemp);
    }
    sendFile(): void{
        // this.fileType = 
        const body = new FormData();
        
        const fileType = this.uploadForm.value.typeUpload;
        var validFormat = this.validFormat(this.fileTemp.fileName);
        if(!validFormat){
            this._fuseAlertService.show('badFileType');   
            setTimeout(()=>{this._fuseAlertService.dismiss('badFileType')},3000)          
        }else{
            this._fuseAlertService.dismiss('badFileType');
            body.append('file',this.fileTemp.fileRaw, this.fileTemp.fileName);
           // console.log(body.fileUp);        
            this.uploadFileService.sendFilePost(body, fileType)
            .subscribe(
                data => {
                    this._fuseAlertService.dismiss('uploadFileBad');
                    this._fuseAlertService.show('uploadFileOk');
                    setTimeout(()=>{this._fuseAlertService.dismiss('uploadFileOk')},3000) 
                    if(fileType == "invoice"){
                        this.validateInvoicesUpload(data.result);
                    }  
                },
                err => {
                    this._fuseAlertService.dismiss('uploadFileOk');
                    this._fuseAlertService.show('uploadFileBad');                    
                    setTimeout(()=>{this._fuseAlertService.dismiss('uploadFileBad')},3000)                                                       
                    console.log(err)
                }
            )
        }
        
    }

    validateInvoicesUpload(data){
        //console.log("invoices OK");
        //console.log(data);
        this.dataExporter = Object.values(data).map(function(thisInvoice : any){
            var invoiceNumber;
            var statusInvoice;
            if(thisInvoice.stateInvoice == "omited"){
                var newInvoice = JSON.stringify(thisInvoice).replace(/\s+/g,"");
                //console.log(newInvoice);
                var invoiceJson = JSON.parse(newInvoice);
                //console.log(invoiceJson);
                invoiceNumber = invoiceJson.NoFACTURA;
                statusInvoice = "error";
            }else{
                invoiceNumber = thisInvoice.dataValues.invoice;
                statusInvoice = "ok";
            }
            return{
                factura: invoiceNumber, 
                estado: statusInvoice, 
            }            
        });
        // data.forEach(element => {
            
        //   if(element.stateInvoice == "omited"){
        //     this.dataExporter.
        //     console.log(element);
        //   }else if( == "new"){

    //     po: string;
    // invoice:string;   
    // status:string;  
            
        //   }
        // });
        console.log("invoices finish");
        this.exportAsXLSX();
    }

    validFormat(fileName : string){
        console.log('El nombre del archivo es: '+fileName);
        let validFormat: string[] = fileName.split('.').reverse();
        if(validFormat[0] == 'csv' || validFormat[0] == 'xlsx'){
            return true;   
        }else{
            return false;
        }
    }

    initForm(): FormGroup {
        return this.fb.group({
            typeUpload: ['', [Validators.required]],
            thisFile: ['', [Validators.required]]            
        });
    }
    
    exportAsXLSX():void{
        this._fuseAlertService.show('downloadResult');
        setTimeout(()=>{this._fuseAlertService.dismiss('downloadResult')},3000)
        this.excelService.exportToExcel(this.dataExporter, 'Estado_carga_facturas');
    }
}
function then(arg0: (res: any) => void): (value: any) => void {
    throw new Error('Function not implemented.');
}

