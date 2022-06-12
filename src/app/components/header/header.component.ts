import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../types";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly user$: Observable<User>;

  constructor(private readonly _api : ApiService) {
    this.user$ = this._api.getUser();
  }
}
