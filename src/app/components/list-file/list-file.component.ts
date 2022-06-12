import {Component} from '@angular/core';
import {PageFile} from "../../types";
import {first, Observable} from "rxjs";
import {HandleService} from "../../services/handle.service";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.scss']
})
export class ListFileComponent {
  public listFiles$: Observable<PageFile>;

  constructor(private readonly handleService: HandleService) {
    this.listFiles$ = this.handleService.listFiles$;
  }

  public async download(id: number) {
    this.handleService.download(id)
      .pipe(first())
      .subscribe();
  }

  public changePage(value: number) {
    this.handleService.getListFiles(value);
  }

  public async delete(id: number, name: string) {
    if (confirm(`Вы действительно хотите удалить файл "${name}"?`)) {
      this.handleService.deleteFile(id)
        .pipe(first())
        .subscribe(() => this.handleService.getListFiles());
    }
  }
}
