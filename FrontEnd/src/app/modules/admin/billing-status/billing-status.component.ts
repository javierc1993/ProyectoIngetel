import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { variablesGlobales } from 'GLOBAL';

@Component({
  selector: 'app-billing-status',
  templateUrl: './billing-status.component.html',
  
})
export class BillingStatusComponent implements OnInit {

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cargueCompleto();
  }

  cargueCompleto(){
    console.log("cargando el componente billing status")
  }

}
