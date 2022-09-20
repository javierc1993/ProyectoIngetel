import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { variablesGlobales } from 'GLOBAL';

@Component({
  selector: 'app-po-status',
  templateUrl: './po-status.component.html',  
})
export class PoStatusComponent implements OnInit {

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cargueCompleto();
  }

  cargueCompleto(){
    console.log("cargando el componente PO status")
  }
}
