import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "app/login/login.component";
import { MenuComponent } from "app/main/menu/menu.component";
import { DashboardComponent } from "app/main/dashboard/dashboard.component";
import { AssetComponent } from "app/main/asset/asset.component";
import { AuthGuard } from "app/services/service/AuthGuard";

const config: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'asset', component: AssetComponent, canActivate: [AuthGuard]},
  {path: '**', component:AppComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(config, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
