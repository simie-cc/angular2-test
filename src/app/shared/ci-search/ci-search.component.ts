import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiHelloWorldHandler } from "app/services/api/ApiHelloWorldHandler";
import { SpecService } from "app/services/service/SpecService";
import { QuerySpec } from "app/vo/QuerySpec";
import { LDAP } from "app/vo/LDAP";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

/**
 * 顯示 Configuration Item 查詢區塊
 */

@Component({
  selector: 'ci-search',
  templateUrl: './ci-search.component.html',
  styleUrls: ['./ci-search.component.css']
})
export class CiSearchComponent implements OnInit {

  @Output() private formSubmit = new EventEmitter<QuerySpec>() ;


  doSubmit(queryForm){
    let a = queryForm.value  ;
    console.log('formdata:'+JSON.stringify(a));
    queryForm.reset() ;
    console.log('formdata:'+JSON.stringify(queryForm.value));

  }
  constructor(private specService:SpecService) { }

  ngOnInit() {

  }

  selectCom(e,spec){
    // console.log(JSON.stringify(spec));
    console.log(JSON.stringify(spec.optionsCom[e.target.selectedIndex]))
    Observable.of([{"code":"4","name":"D"},{"code":"5","name":"E"},{"code":"6","name":"F"}]).delay(1000).subscribe(
      (d)=>{
        console.log('data1 is coming');
        spec.optionsOrg = d ;
      }
    );

  }

  selectOrg(e,spec){
    // console.log(JSON.stringify(spec));
    console.log(JSON.stringify(spec.optionsOrg[e.target.selectedIndex]))
    Observable.of([{"code":"7","name":"G"},{"code":"8","name":"H"},{"code":"9","name":"I"}]).delay(1000).subscribe(
      (d)=>{
        console.log('data2 is coming');
        spec.optionsUnit = d ;
      }
    );

  }


}
