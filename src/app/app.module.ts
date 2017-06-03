import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { RestTemplate } from "app/services/util/RestTemplate";
import { AppRoutingModule } from "app/app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ServiceBroker,RestTemplate],
  bootstrap: [AppComponent]
})
export class AppModule { }
