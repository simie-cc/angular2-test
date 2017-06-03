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

  public loginUser: LoginUser = new LoginUser() ;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    if(!environment.production){
       this.loginUser.name = "800846" ;
       this.loginUser.password = "800846" ;
    }
  }

  doLogin(loginForm:NgForm){
    console.log('submit:'+JSON.stringify(loginForm.value)) ;
    this.authService.auth(loginForm.value) ;
  }

}
