import { Component } from '@angular/core';
import { AuthService } from "app/services/service/AuthService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService:AuthService){}

  isAuth(){
    return this.authService.isAuth() ;
  }

  hasLogin(){
    return this.authService.hasLogin() ;
  }

}
