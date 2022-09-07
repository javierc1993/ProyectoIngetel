import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable()
export class dataArchivoService{
constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
){}

receiveData(infoFile: {tipeFile}): Observable<any>
{
return this._httpClient.post('http://127.0.0.1:3000/api/v1/consultaData',infoFile).pipe(
    switchMap((response: any) => {
        return of(response);
    })
);
}

}