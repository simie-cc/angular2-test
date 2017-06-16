import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from "@angular/forms";

@Component({
  selector: 'test-rective-form',
  templateUrl: './test-rective-form.component.html',
  styleUrls: ['./test-rective-form.component.css']
})
export class TestRectiveFormComponent implements OnInit {

  ldap:any={
    com:{code:'',name:''},
    org:{code:'',name:''},
    unit:{code:'',name:''}
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
