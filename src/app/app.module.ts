//以下是內建
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//以下是第三方
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { BlockUIModule } from 'ng-block-ui';

//以下是專案相關
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { RestTemplate } from "app/services/util/RestTemplate";
import { AppRoutingModule } from "app/app.routing.module";
import { AuthService } from "app/services/service/AuthService";
import { JwtHelper } from "angular2-jwt";
import { MenuComponent } from './main/menu/menu.component';
import { SubMenuDirective } from './main/menu/submenu.directive';
import { GlyphiconComponent } from './glyphicon/glyphicon.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AssetComponent } from './main/asset/asset.component';
import { AssetRegistryComponent } from './main/asset/asset-registry.component';
import { AuthGuard } from "app/services/service/AuthGuard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SubMenuDirective,
    GlyphiconComponent,
    DashboardComponent,
    AssetComponent,
    AssetRegistryComponent
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
    BlockUIModule
  ],
  providers: [
    ServiceBroker,
    RestTemplate,
    AuthService,
    AuthGuard,
    LocalStorageService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
