import {Headers, Http, RequestOptions, Response} from '@angular/http';

import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()
export class RestTemplate{

  constructor( private http: Http ) { }

   doGenHeaders() {
    let token = '';//this.localStorage.get('access-token');
    let auth_token = 'Bearer ' + token;
    let headers = new Headers({'Content-Type': 'application/json; charset=UTF-8', 'Authorization': auth_token});
    //console.log(headers);

    let options = new RequestOptions({ headers: headers }); // Create a request option
    //console.log(options);

    return options;
  }

  get(url: string): Observable<any>{
    return this.http.get(url, this.doGenHeaders())
      .map((res)=>res.json())
      .catch(this.handleError);
  }

  post(url:string,data:string): Observable<any>{
    return this.http.post(url, data, this.doGenHeaders())
    .map((res) => res.json())
    .catch(this.handleError);
  }

  put(url:string,data:string): Observable<any>{
    return this.http.put(url, data, this.doGenHeaders())
    .map((res) => res.json())
    .catch(this.handleError);
  }

  delete(url: string): Observable<any>{
    return this.http.get(url, this.doGenHeaders())
      .map((res)=>res.json())
      .catch(this.handleError);
  }



  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
