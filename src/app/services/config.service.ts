import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { get } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _data: any;

  constructor(private http: HttpClient) {
  }

  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config/app-config.json')
        .subscribe(data => {
          this._data = data;
          resolve(true);
        }, error => {
          console.log('Error al obtener la configuracion: ' + error);
          reject(true);
        });
    })
  }

  getProperty(key: string){
    return get(this._data, key);
  }

}
