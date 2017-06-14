import { Component, OnInit } from '@angular/core';
import { QueryAssetService } from "app/services/service/QueryAssetService";
import { SpecService } from "app/services/service/SpecService";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiCiRelationdHandler } from "app/services/api/ApiCiRelationHandler";

@Component({
  selector: 'asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  //test
  rows:any ;
  columns:any;
  selected:any[] = [];
  datas:any[] =[ {rows:null,columns:null} ];
  selectTab:string ;
  tabNames:string[] =['test','other'] ;


  constructor(private queryAssetService:QueryAssetService,
              private specService:SpecService,
              private router: ActivatedRoute,
              private sb:ServiceBroker) { }

  ngOnInit() {
    //第一次進入頁面
    console.log('Step0. 第一次進入頁面初始化元件');
    this.initialRouterParam(); //這裡只有第一次進頁面才會執行，後續若是同一個Component換頁則不會執行到
  }

  initialRouterParam(){
    this.blockUI.start("頁面初始化中...");
    this.router.params.subscribe(  //後續若是同一個Component換頁，則router.param會持續收到通知
      (routerParam)=>{
        this.specService.page = routerParam['page'] ;
        console.log('Step1. 接收到選單參數:'+routerParam['page']);
        this.blockUI.stop();
        console.log('Step2. 重置頁面元件參數');
        this.specService.initialPage();
        console.log('Step3. 依頁面參數重新初始化頁面元件');
        this.specService.initialQueryCIOptions();
      },
      (error)=>{
        console.log('呼叫連線發生錯誤:'+error) ;
        this.specService.uiErrorMsg = '連線失敗(連線錯誤): '+error ;
        this.blockUI.stop();
      }
    );
  }

  searchSubmit(queryForm){
    let a = queryForm.value  ;
    console.log('送出去的資料:'+JSON.stringify(a));
    console.log('目前選擇的CI種類:'+JSON.stringify(this.specService.selected)) ;
    queryForm.reset() ;
    this.queryCiData(a) ;
  }

  queryCiData(data){
    this.blockUI.start("查詢資料中...")
    let api:ApiCiRelationdHandler = this.sb.getApiHandler(ApiCiRelationdHandler) ;
    api.queryCiData(this.specService.selected.code, data).subscribe(
      (resp)=>{
        if(resp.tabs && resp.tabName){
          console.log(JSON.stringify(resp.tabName[0]))
          this.tabNames[0] = resp.tabName[0] ;
          this.columns = resp.tabs[0].columns ; //[{ "name": '名稱',"prop":"name" },{ "name": '性別',"prop":"gender" },{ "name": '公司',"prop":"company" }] ;
          this.rows = resp.tabs[0].rows; //[{ "name": "Ethel Price","gender": "female", "company": "Johnson, Johnson and Partners, LLC CMP DDC", "age": 22 }] ;
          console.log('done');
          this.datas[0].rows = resp.tabs[0].rows ;
          this.datas[0].columns = resp.tabs[0].columns ;
        }

        this.blockUI.stop() ;
      },
      (error)=>{
        console.log('error:'+error);
        this.blockUI.stop() ;
      }
    ) ;
  }

  onSelect(event){
    console.log(event);
    console.log(JSON.stringify(this.selected[0]));
  }

  getData(tab){
    this.selectTab = tab ;
    if(this.selectTab == 'other'){
        this.columns = [{ prop: 'name.value' , name:'姓名'} , { name: 'Company' }, { name: 'Gender' }]  ;
        this.rows = [
          {
            "name": {code:'haha',value:'hahaha'},
            "gender": "female",
            "company": "Johnson, Johnson and Partners, LLC CMP DDC",
            "age": 22
        },
        {
            "name": {code:'haha2',value:'hahaha2'},
            "gender": "female",
            "company": "Sealoud",
            "age": 55
        },]  ;
    }else{
      console.log(JSON.stringify(this.datas[0]));
      this.columns = this.datas[0].columns ;
      this.rows = this.datas[0].rows ;
    }

  }


}
