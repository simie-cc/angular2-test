import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiHelloWorldHandler } from "app/services/api/ApiHelloWorldHandler";

/**
 * 顯示 Configuration Item 查詢區塊
 */

@Component({
  selector: 'ci-search',
  templateUrl: './ci-search.component.html',
  styleUrls: ['./ci-search.component.css']
})
export class CiSearchComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  private specs:{label:string,dynamicType:string,name:string,options?:CodeName[],required?:boolean,disabled?:boolean,p?:string}[] = []

  test(f){
    console.log(f.value);
  }
  constructor(private sb:ServiceBroker) { }

  ngOnInit() {
    let fake = [
        {label:'輸入帳號',dynamicType:'InputText',name:'account',required:true, p:"user"},
        {label:'輸入密碼',dynamicType:'InputPasswordText',name:'password',required:true,p:"lock"},
        {label:'選擇角色',dynamicType:'SelectOneMenu',name:'role',options:[{code:'1',name:'IT政策管理者'},{code:'2',name:'財產管理者'}],required:true},
        {label:'多選參數',dynamicType:'SelectManyMenu',name:'param',options:[{code:'1',name:'A'},{code:'2',name:'B'},{code:'3',name:'C'},{code:'4',name:'D'}]},
      ];

      this.blockUI.start('初始化中');
      let api = this.sb.getApiHandler(ApiHelloWorldHandler);
      api.test().map((d)=>d[0].data).delay(3000).subscribe(
        (d)=>{
          console.log(d) ;
          this.specs = d ;
          this.blockUI.stop()
        },
        (error)=>{ this.blockUI.stop() }
      ) ;

    // let sub$ = Observable.of(fake).subscribe(
    //   (data )=>{
    //     console.log('data is comming') ;
    //     this.specs = data  ;
    //   }
    // ) ;
    // sub$.unsubscribe() ;

  };


}
