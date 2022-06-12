import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() public count: number;
  @Input() public page: number;
  @Input() public portionsSize: number;
  @Output() public changePage: EventEmitter<number> = new EventEmitter<number>();
  public massItems: Array<number> = [];

  constructor() {
    this.count = 1;
    this.page = 1;
    this.portionsSize = 1;
  }

  ngOnChanges(): void {
    this.setPage();
  }

  setPage = () => {
    this.massItems = [];
    const {start, end} = this.ItemInterval(this.page, this.count, this.portionsSize);

    for (let i = start; i <= end; i++) {
      this.massItems.push(i);
    }
  }

  ItemInterval = (page: number, sizePage: number, portionsSize: number,) => {
    //Количество ячеек
    let balance = portionsSize % 2;
    let call = Math.floor(portionsSize / 2)
    let start = page - call + 1 - balance;//1-оставшейся ячейка
    let end = page + call;

    //коректируем интервал
    if (start < 1) {
      let correct = 1 - start;
      start = start + correct;
      end = end + correct;
      end = end > sizePage ? sizePage : end;
      return {start, end}

    }

    if (end > sizePage) {
      let correct = sizePage - end;
      start = start + correct;
      end = end + correct;
      return {start, end}
    }

    return {start, end}
  }

}
