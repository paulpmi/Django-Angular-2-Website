import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {dTComponent} from "./djangoTrial/dT";
import {CardService} from "../services/CardService";
import {SpecialService} from "../services/SpecialService";
import {DeckService} from "../services/DeckService";
import {createDeckComponent} from "./createDeck/createDeck";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    dTComponent,
    createDeckComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CardService, SpecialService, DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
