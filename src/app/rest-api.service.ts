import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestApiService {
  constructor(private http: HttpClient) {}

  get(link: string) {
    return this.http.get(link).toPromise(); //get http call
  }

  post(link: string, body: any) {
    return this.http.post(link, body).toPromise(); //post http call
  }
}
