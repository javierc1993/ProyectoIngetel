import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class uploadFileService
{

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * send file to backend
     */
   

    sendFilePost(body:FormData): Observable<any>{
        return this._httpClient.post('http://127.0.0.1:3000/api/v1/production/upload', body)
    }

}
