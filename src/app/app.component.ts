import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';
import {User} from "./types";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'ClientApp';

  public readonly user$: Observable<User>;
  constructor(private readonly _api : ApiService) {
    this.user$ = this._api.getUser();
  }
 // https://localhost:44316/GetUser
  public async  change(s: any){
    let file: File = s.target.files[0];
    console.log(file);
    if (file){
      console.log(new Blob([file], {type: file.type}), '   1111');
      const n: string = await new Blob([file], {type: file.type}).text()
      console.log(new Blob([n],{type: file.type}), '   22222');

      var a = document.createElement("a");
      var url  = window.URL.createObjectURL(new Blob([n],{type: file.type}));
      a.href = url;
      a.download = 'fileName';

      a.click();

      const hash = crypto.MD5(n).toString();
      this._api.checkExistHash(hash).subscribe(answer =>{
        console.log(answer);
        if (!answer.exist) {
          this._api.sendFile(hash, n).subscribe()
        }
      } )
    }
  }

  public  async  delete(id :number){
      this._api.deleteFile(12).subscribe();
  }
}
