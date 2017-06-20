import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-template-form',
  templateUrl: './test-template-form.component.html',
  styleUrls: ['./test-template-form.component.css']
})
export class TestTemplateFormComponent implements OnInit {

  constructor() { }

  ldap:any={
    com:{code:'o=cht;0000',name:'==============請選擇==============='},
    org:{code:'o=cht;0000',name:'==============請選擇==============='},
    unit:{code:'o=cht;0000',name:'==============請選擇==============='}
  };

  ngOnInit() {
  }

  doSubmit(form){
    console.log(form.value);
  }

}
