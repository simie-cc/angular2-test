import { Component, OnInit } from '@angular/core';
import { CodeName } from "app/vo/CodeName";

@Component({
  selector: 'ci-search',
  templateUrl: './ci-search.component.html',
  styleUrls: ['./ci-search.component.css']
})
export class CiSearchComponent implements OnInit {

  private specs:{label:string,dynamicType:string,name:string,options?:CodeName[],required?:boolean,disabled?:boolean,p?:string}[] = [
    {label:'輸入帳號',dynamicType:'InputText',name:'account',required:true, p:"user"},
    {label:'輸入密碼',dynamicType:'InputPasswordText',name:'password',required:true,p:"lock"},
    {label:'選擇角色',dynamicType:'SelectOneMenu',name:'role',options:[{code:'1',name:'IT政策管理者'},{code:'2',name:'財產管理者'}],required:true},
    {label:'多選參數',dynamicType:'SelectManyMenu',name:'param',options:[{code:'1',name:'A'},{code:'2',name:'B'},{code:'3',name:'C'},{code:'4',name:'D'},{code:'5',name:'E'}]},
  ]

  test(f){
    console.log(f.value);
  }


  constructor() { }

  ngOnInit() {
  }

}
