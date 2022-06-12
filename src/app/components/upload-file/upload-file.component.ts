import {Component} from '@angular/core';
import * as CryptoJS from "crypto-js";
import {ApiService} from "../../services/api.service";
import {of, switchMap} from "rxjs";
import {HandleService} from "../../services/handle.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public message: string;
  public file?: File;

  constructor(
    private readonly _api: ApiService,
    private readonly handleService: HandleService
  ) {
    this.message = "Файл не выбран";
  }

  public async change(s: any) {
    this.file = s.target.files[0];
    this.message = this.file?.name ?? "Файл не выбран";
  }

  public readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsBinaryString(file);
    })
  }

  public async save() {
    if (!this.file) {
      return alert('Выберите файл');
    }
    const BinaryString = await this.readFileAsync(this.file) as string;
    const MD5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(BinaryString));
    const hash = MD5.toString(CryptoJS.enc.Hex)
    const formData = new FormData();
    formData.append("file", this.file);
    formData.append("hash", hash);
    this._api.checkExistHash(hash)
      .pipe(
        switchMap((response) =>
          (response?.message)
            ? of(response.message)
            : this._api.sendFile(formData)
        )
      )
      .subscribe({next: message => {
        if (message) {
          alert(message)
        } else {
          this.handleService.getListFiles();
        }
      }, error: (err) => alert(err.error)})
  }
}
