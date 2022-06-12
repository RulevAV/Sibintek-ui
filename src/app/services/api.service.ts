import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExistHash, PageFile, User} from "../types";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private readonly _http: HttpClient) {
  }

  public getUser(): Observable<User> {
    return this._http.get<User>(`/User/GetUser`)
  }

  public getListFiles(page:number = 1): Observable<PageFile> {
    return this._http.get<PageFile>(`/UserFile/?page=${page}`)
  }

  public checkExistHash(hash: string): Observable<ExistHash> {
    return this._http.post<ExistHash>(`/UserFile/existHash`, {hash})
  }

  public sendFile(file: FormData): Observable<void> {
    return this._http.post<void>(`/UserFile`, file)
  }

  public deleteFile(id: number): Observable<void> {
    return this._http.delete<void>(`/UserFile/?id=${id}`)
  }
}
