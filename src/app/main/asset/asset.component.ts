import { Component, OnInit } from '@angular/core';
import { QueryAssetService } from "app/services/service/QueryAssetService";
import { SpecService } from "app/services/service/SpecService";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Component({
  selector: 'asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  constructor(private queryAssetService:QueryAssetService,private specService:SpecService,private router: ActivatedRoute,) { }

  ngOnInit() {
    //step0.鎖定畫面
    //step1.清除此頁面資料
    this.specService.initialPage();
    //step2.做page參數初始化
    this.initialRouterParam();
  }

  initialRouterParam(){
    this.blockUI.start("頁面初始化中...");
    this.router.params.delay(1000).subscribe(
      (routerParam)=>{
        this.specService.page = routerParam['page'] ;
        this.blockUI.stop();
        //step3.依page初始化查詢選單(不知道有沒比較好的寫法...有點鳥)
        this.specService.initialQueryCIOptions();
      },
      (error)=>{
        console.log('呼叫連線發生錯誤:'+error) ;
        this.specService.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
        this.blockUI.stop();
      }
    );
  }

}
