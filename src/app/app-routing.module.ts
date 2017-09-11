import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {dTComponent} from "./djangoTrial/dT";
import {createDeckComponent} from "./createDeck/createDeck";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "djangoTrial", component: dTComponent},
  {path:"createDeck", component:createDeckComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
