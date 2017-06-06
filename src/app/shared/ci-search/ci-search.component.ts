import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiHelloWorldHandler } from "app/services/api/ApiHelloWorldHandler";
import { SpecService } from "app/services/service/SpecService";
import { QuerySpec } from "app/vo/QuerySpec";

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

  }
  constructor(private specService:SpecService) { }

  ngOnInit() {

  }


}
