import {Card} from "../common/Card";
import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {Headers} from '@angular/http';
import {Special} from "../common/Special";
import {Minion} from "../common/Minion";
import {Deck} from "../common/Deck";
import {Spell} from "../common/Spell";
import {Ability} from "../common/Ability";
import { URLSearchParams } from '@angular/http';
//import {CookieService} from "angular2-cookie/core";
/**
 * Created by paulp on 7/18/2017.
 */

@Injectable()
export class CardService{
  //url = "http://localhost:8000/users/?format=json";
  url = "http://localhost:8000/getCard/?format=json";
  urladd = "http://localhost:8000/addMinion/";
  urlToDeck = "http://localhost:8000/addToDeck/";
  urladdSpell = "http://localhost:8000/addSpell/";
  urlGetAbilities = "http://localhost:8000/abilities/?format=json";
  headers = new Headers({ 'Content-Type': 'application/json' });
  //private withCredidentials: any;

  constructor(private http: Http) {
  }

  /*
  addCard(card:Card){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('X-CSRFToken', this.getCookie('csrftoken'));

    return this.http.post(this.url, JSON.stringify(card), {this.withCredidentials = true})
      .toPromise()
      .then(res => res.json())
      .catch();
  }


  addCard(card:Card){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.url, true);
    xhr.withCredentials = true;
    xhr.send(null);
  }
   {headers: headers}
  */
  addCard(cardName:string, cardAttack:number, cardHealth:number, cardSpecial:string, cardDesc:string, cardImg:HTMLImageElement, cardClass:string){
    /*let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log("before post");
    */
    let special = new Special();
    special.type = cardSpecial;
    let card = new Minion();
    console.log(cardName);
    console.log("ICI");
    card.name = cardName;
    card.attack = cardAttack;
    card.health = cardHealth;
    card.specialDescription = cardDesc;
    card.image = cardImg;
    card.special = special;
    card.class = cardClass;

    let body = JSON.stringify({ 'foo': card });
    let options = new RequestOptions({ headers: this.headers });

    return this.http.put(this.urladd, body, { headers: this.headers })
      .map(response => response.json());

  }

  addSpell(name:string, ability:string, desc:string){
    let abilityObj = new Ability();
    abilityObj.ability = ability;

    let spell = new Spell();
    spell.name = name;
    spell.ability = abilityObj;
    spell.specialDescription = desc;
    return this.http.post(this.urladdSpell, JSON.stringify(spell)).map(response => response.json()).subscribe();
  }

  getAbilities(){
    console.log("Reched");
    return this.http.get(this.urlGetAbilities)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCards() {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCardsOfClass(deckClass:string){
    let params = new URLSearchParams();
    params.append("deckClass", deckClass);
    console.log(params);
    return this.http.get(this.url, {search: params})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addToDeck(card:Card, deck:Deck){
    console.log(card);
    return this.http.post(this.urlToDeck, JSON.stringify({'card':card, 'deck':deck})).map(reponse => reponse.json()).subscribe();
  }

}
