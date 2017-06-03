import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";
import { LoginUser } from "app/formData/LoginUser";
import { NgForm } from '@angular/forms';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { HelloWorld } from "app/services/api/HelloWorld";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUser: LoginUser = new LoginUser() ;

  constructor(private service:ServiceBroker) { }

  ngOnInit() {
    if(!environment.production){
       this.loginUser.name = "800846" ;
       this.loginUser.password = "800846" ;
    }
  }

  doLogin(loginForm:NgForm){
    console.log('submit:'+JSON.stringify(loginForm.value)) ;
  }

}
