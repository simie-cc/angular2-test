import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";
import { LoginUser } from "app/formData/LoginUser";
import { NgForm } from '@angular/forms';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { AuthService } from "app/services/service/AuthService";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    //測試環境
    if(!environment.production){
       this.authService.loginUser.name = "800846" ;
       this.authService.loginUser.password = "800846" ;
    }
  }

  doLogin(loginForm:NgForm){
    console.log('submit:'+JSON.stringify(loginForm.value)) ;
    this.authService.auth(loginForm.value) ;
  }


}
