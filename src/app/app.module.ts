//以下是內建
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//以下是第三方
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { BlockUIModule } from 'ng-block-ui';
import { JwtHelper } from "angular2-jwt";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//以下是業務功能相關
import { AppRoutingModule } from "app/app.routing.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './main/menu/menu.component';
import { SubMenuDirective } from './main/menu/submenu.directive';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AssetComponent } from './main/asset/asset.component';
import { AssetRegistryComponent } from './main/asset/asset-registry.component';

//底層功能
import { AuthGuard } from "app/services/service/AuthGuard";
import { AuthService } from "app/services/service/AuthService";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { RestTemplate } from "app/services/util/RestTemplate";

//Shared component
import { CiSearchComponent } from './shared/ci-search/ci-search.component';
import { GlyphiconComponent } from './shared/glyphicon/glyphicon.component';
import { DynamicHtmlComponent } from './shared/dynamic-html/dynamic-html.component';
import { CiTableComponent } from './shared/ci-table/ci-table.component';
import { LdapMenuComponent } from './shared/ldap-menu/ldap-menu.component';
import { SpecService } from "app/services/service/SpecService";
import { QueryAssetService } from "app/services/service/QueryAssetService";
import { AssetinComponent } from './main/idc/assetin/assetin.component';
import { AssetoutComponent } from './main/idc/assetout/assetout.component';
import { AssetexchangeComponent } from './main/idc/assetexchange/assetexchange.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SubMenuDirective,
    GlyphiconComponent,
    DashboardComponent,
    AssetComponent,
    AssetRegistryComponent,
    CiSearchComponent,
    DynamicHtmlComponent,
    CiTableComponent,
    LdapMenuComponent,
    AssetinComponent,
    AssetoutComponent,
    AssetexchangeComponent
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
    BlockUIModule,
    NgxDatatableModule
  ],
  providers: [
    ServiceBroker,
    RestTemplate,
    AuthService,
    AuthGuard,
    SpecService,
    QueryAssetService,
    LocalStorageService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
