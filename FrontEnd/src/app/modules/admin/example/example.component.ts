import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface transaction {
    transactionId: number;
    name: string;
    amount: string;
    status: string;

}
const datosHoja: transaction[] =[
{transactionId:1, name:'sitio1',amount:'14',status:'pending'},
{transactionId:2, name:'sitio2',amount:'13',status:'pending'},
{transactionId:3, name:'sitio3',amount:'12',status:'pending'},
{transactionId:4, name:'sitio4',amount:'11',status:'pending'},
{transactionId:5, name:'sitio5',amount:'10',status:'pending'},
];
@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
    /**
     * Constructor
     */
     dataSource = datosHoja;
     recentTransactionsTableColumns: string[] = ['transactionId','name', 'amount', 'status'];
    constructor () {

    }

    
}
