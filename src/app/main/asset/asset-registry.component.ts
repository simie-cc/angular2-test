import { Component, OnInit } from '@angular/core';
import { SpecService } from "app/services/service/SpecService";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-asset-registry',
  templateUrl: './asset-registry.component.html',
  styleUrls: ['./asset-registry.component.css']
})
export class AssetRegistryComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  constructor(private specService:SpecService,private router: ActivatedRoute) { }

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


  createSubmit(queryForm){

  }

}
