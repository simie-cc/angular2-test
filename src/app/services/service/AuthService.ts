
import { Injectable } from "@angular/core";
import { ApiJwtAuthHandler } from "app/services/api/ApiJwtAuthHandler";
import { LoginUser } from "app/formData/LoginUser";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { LocalStorageService } from "angular-2-local-storage";
import {JwtHelper} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AuthService{

  constructor(private sb:ServiceBroker,private localStorage: LocalStorageService,private jwt: JwtHelper){}

  auth(loginUser:LoginUser){
    let authHandler:ApiJwtAuthHandler = this.sb.getApiHandler(ApiJwtAuthHandler) ;
    authHandler.auth(loginUser).subscribe(
      (data:LoginUser) => {

        this.localStorage.set('access-token', data.token);

        console.log('============token information=============');
        console.log('access-token:'+this.localStorage.get('access-token')) ;
        console.log('decodeToken:'+JSON.stringify(this.jwt.decodeToken(data.token)));
        console.log('token expire date:'+this.jwt.getTokenExpirationDate(data.token));
        console.log('token is expired:'+this.jwt.isTokenExpired(data.token));

      }
    ) ;
  }
}
