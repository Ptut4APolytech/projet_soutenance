import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  rootUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getSeries() {
    return this.http.get(this.rootUrl + '/serie');
  }

  deleteSerie(id: number) {
    return this.http.delete(this.rootUrl + '/serie/' + id);
  }
}
