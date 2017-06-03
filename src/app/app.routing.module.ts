import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "app/login/login.component";

const config: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  // {path: 'main', component: MainComponent},
  {path: '**', component:LoginComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(config, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
