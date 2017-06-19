import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from "@angular/forms";

@Component({
  selector: 'test-rective-form',
  templateUrl: './test-rective-form.component.html',
  styleUrls: ['./test-rective-form.component.css']
})
export class TestRectiveFormComponent implements OnInit {

  ldap:any={
    com:{code:'o=cht;0000',name:'==============請選擇==============='},
    org:{code:'o=cht;0000',name:'==============請選擇==============='},
    unit:{code:'o=cht;0000',name:'==============請選擇==============='}
  };
  form = new FormGroup({
      inputName: new FormControl(),
      model: new FormControl()
    }) ;

  constructor() {

  }

  ngOnInit() {
  }

  doSubmit(event){
    console.log(event);
  }

}
