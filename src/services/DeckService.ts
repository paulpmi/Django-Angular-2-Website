import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Deck} from "../common/Deck";
import {Card} from "../common/Card";
import { URLSearchParams } from '@angular/http';
/**
 * Created by paulp on 8/2/2017.
 */


@Injectable()
export class DeckService{
  urlGet = "http://localhost:8000/decks/?format=json";
  urlGetCards = "http://localhost:8000/getTheCardsOfDeck2/";
  urlAdd = "http://localhost:8000/addDeck/";
  urlToDeck = "http://localhost:8000/addToDeck/";

  constructor(private http: Http) {
  }

  addDeck(deckName:string, deckClass:string){
    let deck = new Deck();
    deck.name = deckName;
    deck.className = deckClass;
    return this.http.post(this.urlAdd, JSON.stringify(deck)).map(reponse => reponse.json()).subscribe();
  }

  addToDeck(card:Card, deck:Deck){
    console.log(card);
    return this.http.post(this.urlToDeck, JSON.stringify({'card':card, 'deck':deck})).map(reponse => reponse.json()).subscribe();
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getCards(){
    return this.http.get(this.urlGet)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCardsOfDeck(name:string, deckClass:string) {
    console.log(name);
    let params = new URLSearchParams();
    params.append("name", name);
    params.append('deckClass', deckClass);
    console.log(params);
    return this.http.get(this.urlGetCards, {search: params}).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
