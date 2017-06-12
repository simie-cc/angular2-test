import { Injectable } from "@angular/core";
import { ApiJwtAuthHandler } from "app/services/api/ApiJwtAuthHandler";
import { LoginUser } from "app/formData/LoginUser";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { LocalStorageService } from "angular-2-local-storage";
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { NgBlockUI, BlockUI } from "ng-block-ui";
import { Router } from "@angular/router";
import { ApiSpecHandler } from "app/services/api/ApiSpecHandler";
import { CodeName } from "app/vo/CodeName";
import { QuerySpec } from "app/vo/QuerySpec";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

/**
 * 存放查詢規格的結果與相關查詢後端的服務
 */
@Injectable()
export class SpecService{

  @BlockUI() blockUI: NgBlockUI;
  private cioptions:CodeName[] ; //CI下拉選單
  private specs:QuerySpec[] = [] //動態查詢條件規格

  public uiErrorMsg:string; //錯誤訊息
  public page:string ; //現在在哪一個功能頁(終端[asset]或機房[idcasset]?)
  public selected:CodeName ; //現在選到哪一個CI

  constructor(
    private sb:ServiceBroker,
    private router: Router,
  ){}

  initialPage(){
    this.cioptions=[] ;
    this.specs = [] ;
    this.uiErrorMsg='';
  }


  initialQueryCIOptions(){
    // let fake = [ {code:"Asset",name:"終端設備"},
    //              {code:"IDCAsset",name:"機房設備"},
    //              {code:"IDC",name:"機房"},
    //              {code:"OS",name:"作業系統"},
    //              {code:"Software",name:"軟體"},
    //              {code:"Network",name:"網路"}
    //  ]
     this.blockUI.start('表單初始化中...');
     console.log('表單初始化');
     let api = this.sb.getApiHandler(ApiSpecHandler);
      api.getSelectOptions(this.page).subscribe(
        (opts)=>{
          this.cioptions = opts ;
          console.log('表單初始化完成');
          this.blockUI.stop()
        },
        (error)=>{
          console.log('呼叫連線發生錯誤:'+error) ;
          this.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
          this.blockUI.stop()
        }
      ) ;

  }

  selectCIOption(event){
    console.log('現在選的是'+JSON.stringify(this.selected));
    // this.selected = this.cioptions[event.target.selectedIndex] ;
    if(this.page !== 'registry'){
      this.initialQueryBlock(this.selected) ;
    }else{
      this.initialCreateBlock(this.selected) ;
    }

  }

  initialQueryBlock(selectedOption:CodeName){

      this.blockUI.start('初始化中');
      let api = this.sb.getApiHandler(ApiSpecHandler);
      api.getUIQuerySpec(selectedOption.code).subscribe(
        (d:QuerySpec[])=>{
          console.log('QuerySpec:'+JSON.stringify(d)) ;
          this.specs = d ;
          this.blockUI.stop()
        },
        (error)=>{
          console.log('呼叫連線發生錯誤:'+error) ;
          this.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
          this.blockUI.stop()
        }
      ) ;

  }

  initialCreateBlock(selectedOption:CodeName){
    this.blockUI.start('初始化中');
      let api = this.sb.getApiHandler(ApiSpecHandler);
      api.getUICreateSpec(selectedOption.code).subscribe(
        (d:QuerySpec[])=>{
          console.log('QuerySpec:'+JSON.stringify(d)) ;
          this.specs = d ;
          this.blockUI.stop()
        },
        (error)=>{
          console.log('呼叫連線發生錯誤:'+error) ;
          this.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
          this.blockUI.stop()
        }
      ) ;
  }

}
