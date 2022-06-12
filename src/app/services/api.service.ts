import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExistHash, PageFile, User} from "./types";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public readonly api = 'https://localhost:44346';

  constructor(private readonly _http: HttpClient) {
  }
  public getUser(): Observable<User> {
    return this._http.get<User>(`${this.api}/User/GetUser`)
  }
  public getFile(id :number): Observable<User> {
    return this._http.get<any>(`${this.api}/UserFile/getFile/?id=${id}`)
  }

  public getlistFiles(id:number = 1): Observable<PageFile> {
    return this._http.get<PageFile>(`${this.api}/UserFile/?page=${id}`)
  }

  public checkExistHash(hash: string): Observable<ExistHash> {
    return this._http.post<ExistHash>(`${this.api}/UserFile/existHash`, {hash})
  }

  public sendFile(file: any): Observable<void> {
    return this._http.post<void>(`${this.api}/UserFile`, file)
  }

  public deleteFile(id: number): Observable<void> {
    return this._http.delete<void>(`${this.api}/UserFile/?id=${id}`)
  }
}
