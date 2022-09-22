import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { variablesGlobales } from 'GLOBAL';
@Injectable({
    providedIn: 'root',
})
export class uploadFileService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * send file to backend
     */

    sendFilePost(body: FormData, fileType: string): Observable<any> {
        return this._httpClient.post(
            variablesGlobales.urlBackend + '/'+fileType+'/upload',
            body
        );
    }
}
