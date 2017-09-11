import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthorsComponent} from "./authors/authors.component";
import {AuthorsDetailComponent} from "./authors/authors-detail/authors-detail.component";
import {AuthorsNewComponent} from "./authors/authors-new/authors-new.component";
import {PizzaComponent} from "./pizza/pizza.component";
import {BuyersComponent} from "./buyers/buyers.component";
import {BuyersNewComponent} from "./buyers/buyers-new/buyers-new.component";
import {BuyersDetailComponent} from "./buyers/buyers-detail/buyers-detail.component";
import {BuyersListComponent} from "./buyers/buyers-list/buyers-list.component";
import {BuyersCreateComponent} from "./buyers/buyers-create/buyers-create.component";
import {Pizza10Component} from "./pizza10/pizza10.component";

const routes: Routes = [
  { path: 'ab/authors',     component: AuthorsComponent },
  { path: 'ab/authors/new', component: AuthorsNewComponent},
  { path: 'ab/authors/:id', component: AuthorsDetailComponent},
  { path: 'pizzashop195/pizzas', component: PizzaComponent},
  { path: 'ab/buyers', component:BuyersComponent},
  { path: 'ab/buyers/new', component:BuyersNewComponent},
  { path: 'ab/buyers/go', component:BuyersListComponent},
  { path: 'ab/buyers/create', component:BuyersCreateComponent} ,
  { path: 'pizza/:id', component:BuyersDetailComponent} ,
  {path: 'pizzashop1910/pizzas', component:Pizza10Component},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
