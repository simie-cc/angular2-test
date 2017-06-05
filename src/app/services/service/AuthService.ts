import { Injectable } from "@angular/core";
import { ApiJwtAuthHandler } from "app/services/api/ApiJwtAuthHandler";
import { LoginUser } from "app/formData/LoginUser";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { LocalStorageService } from "angular-2-local-storage";
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { NgBlockUI, BlockUI } from "ng-block-ui/dist";
import { Router } from "@angular/router";
/**
 * 處理登入頁認證相關動作及存放登入後的相關資訊
 */

@Injectable()
export class AuthService{

  @BlockUI() blockUI: NgBlockUI;

  public uiErrorMsg: string ;
  private loginUser: LoginUser = new LoginUser() ;

  constructor(
    private sb:ServiceBroker,
    private localStorage: LocalStorageService,
    private jwt: JwtHelper,
    private router: Router,
  ){}

  //登入認證
  auth(loginUser:LoginUser){

    this.uiErrorMsg = null ;
    let authHandler:ApiJwtAuthHandler = this.sb.getApiHandler(ApiJwtAuthHandler) ;

    this.blockUI.start('處理中...') ;

    authHandler.auth(loginUser).subscribe(
      (data:LoginUser) => {
        let backdoorRoles = this.loginUser.roles ; //若從後門點選角色
        this.loginUser = data ; //存進來

        this.localStorage.set('access-token', data.token);
        // console.log('get response:'+ JSON.stringify(data)) ;
        if(data.success){
          console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ token information ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
          console.log('[access-token]: '+this.localStorage.get('access-token')) ;
          console.log('[decodeToken]: '+JSON.stringify(this.jwt.decodeToken(data.token)));
          console.log('[token expire date]: '+this.jwt.getTokenExpirationDate(data.token));
          console.log('[token is expired]: '+this.jwt.isTokenExpired(data.token));
          console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ token information ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
          this.loginUser.roles = JSON.parse(this.jwt.decodeToken(data.token).roles) ;
          // console.log('後門選擇'+JSON.stringify(backdoorRoles));
          if(backdoorRoles) this.loginUser.roles = backdoorRoles ; //蓋回去
          // console.log('蓋回去'+JSON.stringify(this.loginUser.roles));

          this.router.navigate(['dashboard']);
        }else{
          this.uiErrorMsg = '登入失敗: '+data.msg ;
        }
        this.blockUI.stop() ;

      },
      (error) =>{
        console.log('呼叫連線發生錯誤:'+error) ;
        this.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
        this.blockUI.stop() ;
      }

    ) ;

  }

  //登出
  unauth(){
    this.localStorage.remove('access-token');
    this.loginUser = new LoginUser() ;
    this.router.navigate(['/login']);
  }

  //是否已經登入
  hasLogin(){
    return this.loginUser.success==true ;
  }

  //是否驗證過
  isAuth():boolean{
    this.localStorage
    const accessToken = this.localStorage.get('access-token');
    if (accessToken != null) {
      return true ;
    }
    return false ;
  }

  //取得登入者資訊
  get user(){
    return this.loginUser ;
  }
  //設定登入者資訊
  set user(user:LoginUser){
    this.loginUser = user ;
  }

}
