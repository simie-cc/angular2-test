import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/service/AuthService";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.unauth() ;
  }


}
