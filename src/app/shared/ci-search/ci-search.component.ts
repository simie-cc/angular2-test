import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiHelloWorldHandler } from "app/services/api/ApiHelloWorldHandler";
import { SpecService } from "app/services/service/SpecService";
import { QuerySpec } from "app/vo/QuerySpec";
import { LDAP } from "app/vo/LDAP";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { ApiLdapHandler } from "app/services/api/ApiLdapHandler";

/**
 * 顯示 Configuration Item 查詢區塊
 */

@Component({
  selector: 'ci-search',
  templateUrl: './ci-search.component.html',
  styleUrls: ['./ci-search.component.css']
})
export class CiSearchComponent implements OnInit {

  @Input() searchTitle:string ;
  @Input() searchSubtitle:string ;
  @Input() searchIcon:string ;
  @Input() searchBtnName:string ;

  @Output() formSubmit = new EventEmitter() ;

  @BlockUI() blockUI: NgBlockUI;

  doSubmit(queryForm){
    this.formSubmit.emit(queryForm) ;
    queryForm.reset() ;
  }
  constructor(private specService:SpecService,private sb:ServiceBroker,) { }

  ngOnInit() {

  }

  selectCom(e,spec){
    // console.log(JSON.stringify(spec));
    console.log(JSON.stringify(spec.optionsCom[e.target.selectedIndex]))
    let ldap = spec.optionsCom[e.target.selectedIndex].code.split(';') ;
    spec.optionsOrg = null ;
    spec.optionsUnit = null ;
    let api:ApiLdapHandler = this.sb.getApiHandler(ApiLdapHandler) ;

    this.blockUI.start('拮取LDAP資料中...')
    api.getChtUnitsForUI(ldap[0],ldap[1]).subscribe(
      (data)=>{
        spec.optionsOrg = data ;
        this.blockUI.stop();
      },
      (error)=>{
          console.log('呼叫連線發生錯誤:'+error) ;
          this.specService.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
          this.blockUI.stop()
        }
    );

    // Observable.of([{code:"A",name:"A"},{code:"B",name:"B"}]).subscribe(
    //   (data)=>{
    //     spec.optionsOrg = data ;
    //     this.blockUI.stop();
    //   }
    // )


  }

  selectOrg(e,spec){
    // console.log(JSON.stringify(spec));
    console.log(JSON.stringify(spec.optionsOrg[e.target.selectedIndex]))
    let ldap = spec.optionsOrg[e.target.selectedIndex].code.split(';') ;

    let api:ApiLdapHandler = this.sb.getApiHandler(ApiLdapHandler) ;

    this.blockUI.start('拮取LDAP資料中...')
    api.getChtUnitsForUI(ldap[0],ldap[1]).subscribe(
      (data)=>{
        spec.optionsUnit = data ;
        this.blockUI.stop();
      },
      (error)=>{
          console.log('呼叫連線發生錯誤:'+error) ;
          this.specService.uiErrorMsg = '登入失敗(連線錯誤): '+error ;
          this.blockUI.stop()
        }
    );

    // Observable.of([{code:"C",name:"C"},{code:"D",name:"D"}]).subscribe(
    //   (data)=>{
    //     spec.optionsUnit = data ;
    //     this.blockUI.stop();
    //   }
    // )

  }


}
