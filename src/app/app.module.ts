//以下是內建
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//以下是第三方
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

//以下是專案相關
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { RestTemplate } from "app/services/util/RestTemplate";
import { AppRoutingModule } from "app/app.routing.module";
import { AuthService } from "app/services/service/AuthService";
import { JwtHelper } from "angular2-jwt";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'ictinv-app',
      storageType: 'localStorage'
    }),
  ],
  providers: [
    ServiceBroker,
    RestTemplate,
    AuthService,
    LocalStorageService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
