import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExistHash, File, PageFile, User} from "../types";

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
  public getFile(id :number): Observable<File> {
    return this._http.get<File>(`${this.api}/UserFile/getFile/?id=${id}`)
  }

  public getListFiles(page:number = 1): Observable<PageFile> {
    return this._http.get<PageFile>(`${this.api}/UserFile/?page=${page}`)
  }

  public checkExistHash(hash: string): Observable<ExistHash> {
    return this._http.post<ExistHash>(`${this.api}/UserFile/existHash`, {hash})
  }

  public sendFile(file: FormData): Observable<void> {
    return this._http.post<void>(`${this.api}/UserFile`, file)
  }

  public deleteFile(id: number): Observable<void> {
    return this._http.delete<void>(`${this.api}/UserFile/?id=${id}`)
  }
}
