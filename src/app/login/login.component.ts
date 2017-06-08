import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";
import { LoginUser } from "app/formData/LoginUser";
import { NgForm } from '@angular/forms';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { AuthService } from "app/services/service/AuthService";
import { CodeName } from "app/vo/CodeName";
import { ApiUserHandler } from "app/services/api/ApiUserHandler";
import { LDAP } from "app/vo/LDAP";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roleMenu:CodeName[] ;
  roleSelect:CodeName[]=[] ;

  constructor(private authService:AuthService,private sb:ServiceBroker,) { }

  ngOnInit() {
    //測試環境
    if(!environment.production){
       this.authService.user.name = "800846" ;
       this.authService.user.password = "800846" ;
    }

    let userHandler = this.sb.getApiHandler(ApiUserHandler);

    userHandler.getAllRoles().subscribe(
      (roles:CodeName[]) =>{
        this.roleMenu = roles ;
      },
      (err)=> console.log(err)
    );

  }

  doLogin(loginForm:NgForm){
    if(this.roleSelect.length>0) this.authService.user.roles = this.roleSelect ;
    this.authService.auth(loginForm.value) ;
  }

  clickRole(btn:HTMLButtonElement){
    let selected = btn.className==='btn btn-default' ;
    btn.className = selected ? 'btn btn-primary' : 'btn btn-default' ;
    // console.log(typeof btn.value) ; //string
    let role = JSON.parse(btn.value) ;
    if(selected){  //這次要選
      if(this.roleSelect.indexOf(role)<0){ //如果不存在就加入
        this.roleSelect.push(role) ;
        this.roleSelect = [...this.roleSelect] ;
      }
    }else{ //這次要取消
      this.roleSelect = this.roleSelect.filter(x=>{ return role.code==x.code }) ;
    }

  }

  //===========test



  private optionsCom = [{code:"1",name:"A"},{code:"2",name:"B"},{code:"3",name:"C"}] ;
  private optionsOrg = [{code:"4",name:"D"},{code:"5",name:"E"},{code:"6",name:"F"}] ;
  private optionsUnit = [{code:"7",name:"G"},{code:"8",name:"H"},{code:"9",name:"I"}] ;
  private testModel:LDAP = { com:this.optionsCom[2], org:this.optionsOrg[2], unit:this.optionsUnit[2] };

  testSelectEvent(event){
    console.log(this.testModel);
  }




}
