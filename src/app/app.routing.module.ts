import {AssetRegistryComponent} from './main/asset/asset-registry.component';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "app/login/login.component";
import { MenuComponent } from "app/main/menu/menu.component";
import { DashboardComponent } from "app/main/dashboard/dashboard.component";
import { AssetComponent } from "app/main/asset/asset.component";
import { AuthGuard } from "app/services/service/AuthGuard";
import { AssetexchangeComponent } from "app/main/idc/assetexchange/assetexchange.component";
import { AssetoutComponent } from "app/main/idc/assetout/assetout.component";
import { AssetinComponent } from "app/main/idc/assetin/assetin.component";

const config: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'asset/:page', component: AssetComponent, canActivate: [AuthGuard]},
  {path: 'asset-registry', component: AssetRegistryComponent, canActivate: [AuthGuard]},
  {path: 'assetin', component: AssetinComponent, canActivate: [AuthGuard]},
  {path: 'assetout', component: AssetoutComponent, canActivate: [AuthGuard]},
  {path: 'assetexchange', component: AssetexchangeComponent, canActivate: [AuthGuard]},
  {path: '**', component:AppComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(config, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
