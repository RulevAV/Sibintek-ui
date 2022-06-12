import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, first} from "rxjs";
import {PageFile} from "../types";

@Injectable({
  providedIn: 'root'
})

export class HandleService {
  public listFiles$: BehaviorSubject<PageFile> = new BehaviorSubject<PageFile>({
    count:0,
    page:0,
    files:[]
  });

  constructor(private readonly _api: ApiService) {
    this._api.getListFiles()
      .pipe(first())
      .subscribe(pageFile => this.listFiles$.next(pageFile));
  }

  public getListFiles(page?: number) {
    this._api.getListFiles(page)
      .pipe(first())
      .subscribe(pageFile => this.listFiles$.next(pageFile));
  }

  public deleteFile(id: number) {
    return this._api.deleteFile(id);
  }
}
