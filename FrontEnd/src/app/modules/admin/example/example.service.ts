import { BehaviorSubject, Observable, tap } from "rxjs";
import {HttpClient} from '@angular/common/http';
import { variablesGlobales } from 'GLOBAL';

export class ExampleService{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    get data$():Observable<any>
    {
        return this._data.asObservable();
    }

    getData(): Observable<any>
    {
        return this._httpClient.get(variablesGlobales.urlBackend +'/production/' ).pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
}