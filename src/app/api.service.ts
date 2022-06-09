import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExistHash, User} from "./types";

@Injectable()

export class ApiService {

  public readonly api = 'https://localhost:44346';
  constructor(private readonly _http: HttpClient) {
  }

  // const objs = {
  //   hash : "asdasd",
  //   File:"asdasd",
  // }

  public getUser(): Observable<User> {
    return this._http.get<User>(`${this.api}/User/GetUser`)
  }

  public checkExistHash(hash: string): Observable<ExistHash> {
    return this._http.post<ExistHash>(`${this.api}/UserFile/existHash`,{hash})
  }

  public sendFile(hash: string, file: string): Observable<void>{
    console.log(file);
    return this._http.post<void>(`${this.api}/UserFile`,{hash, file})
  }

  public deleteFile(id: number): Observable<void>{
    return this._http.delete<void>(`${this.api}/UserFile/${id}`)
  }
}
