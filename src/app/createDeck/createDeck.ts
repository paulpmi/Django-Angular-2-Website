import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DeckService} from "../../services/DeckService";
import {Card} from "../../common/Card";
import {Deck} from "../../common/Deck";
import {CardService} from "../../services/CardService";
/**
 * Created by paulp on 8/15/2017.
 */

@Component(
  {
    selector: 'app-createDeck',
    templateUrl: './createDeck.html'
    //styleUrls: ['./dT.css']
  }
)

export class createDeckComponent implements OnInit{
  error:any;

  deck:Card[] = [];
  deckName:string;
  deckClass:string;

  cards:Card[];

  classes:string[] = ['Druid', 'Rogue', 'Shaman', 'Warlock', 'Priest', 'Warrior', 'Hunter', 'Mage', 'Paladin'];
  deckCreated:boolean;

  constructor(private router:Router, private deckService:DeckService, private cardService:CardService){
  }

  ngOnInit(){
    this.deckCreated = false;
  }

  createDeck(name:string, deckClass:string){
    this.deckName = name;
    this.deckClass = deckClass;
    this.deckCreated = true;
    this.deckService.addDeck(name, deckClass);
    this.getCards();
  }

  getCards(){
    console.log(this.deckClass);
    this.cardService
      .getCardsOfClass(this.deckClass)
      .then(cards => {this.cards = cards; console.log(cards)})
      .catch(error => this.error = error);
  }

  addToDeck(name:string){
    if(this.deck.length <= 30) {
      let x = 0;
      for (let card of this.deck){
        if (card.name == name)
          x++;
      }
      if (x<2) {
        let card = this.cards.find(x => x.name == name);
        let deck = new Deck();
        deck.name = this.deckName;
        deck.className = this.deckClass;
        let response = this.deckService.addToDeck(card, deck);
        console.log(name);
        //this.deck.push(card);
        console.log("YO!");
        //this.deckService.getCards().then(dinos => {console.log(dinos);if(dinos == this.deckName) this.deck = dinos;}).catch(error => this.error = error);
        //TO DO: iterate through all dinos and check only for the right name&class combination

        setTimeout(()=>{this.deckService.getCardsOfDeck(this.deckName, this.deckClass).then(cards => {
          console.log("kjhjkhkjhk");
            console.log(cards);
            this.deck = cards;
            console.log(this.deck);
          }).catch(error => this.error = error);}, 3000);
        //this.deck.push(card);
        console.log("ending");
        console.log(response);
      }
    }
  }

}
