/**
 * Created by paulp on 7/18/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Card} from "../../common/Card";
import {CardService} from "../../services/CardService";
import 'rxjs/Rx';
import {Special} from "../../common/Special";
import {Deck} from "../../common/Deck";
import {SpecialService} from "../../services/SpecialService";
import {DeckService} from "../../services/DeckService";
import {Ability} from "../../common/Ability";

@Component(
  {
    selector: 'app-djangoTrial',
    templateUrl: './dT.html',
    styleUrls: ['./dT.css']
  }
)

export class dTComponent implements OnInit{
  special:string;
  specials:Special[];
  error:any;
  cards:Card[];

  deck:Card[]= [];
  deckName:string;
  deckClass:string;

  abilities:Ability[];

  classes:string[] = ['Druid', 'Rogue', 'Shaman', 'Warlock', 'Priest', 'Warrior', 'Hunter', 'Mage', 'Paladin', 'Neutral'];

  deckCreated:boolean;
  //res:string;

  constructor(private router:Router, private specialService: SpecialService, private cardService: CardService, private deckService:DeckService) {
    //this.card = new Card();
  }

  ngOnInit() {
      this.getSpecials();
      this.getCards();
      this.getAbilities();
      this.deckCreated = false;
  }


  addSpecial(special:string){
    let res = this.specialService.addSpecial(special);
    this.getSpecials();
    //window.location.reload();
    return res;
  }

  addCard(name:string, cardAttack:number, cardHealth:number, cardSpecial:string, cardDesc:string, cardImg:HTMLImageElement, cardClass:string){
    console.log(name);
    console.log("POWERPLANT");
    let res = this.cardService.addCard(name, cardAttack, cardHealth, cardSpecial, cardDesc, cardImg, cardClass);
    res.subscribe(c=>console.log(c));
    this.getCards();
    //window.location.reload();
    return res;
  }

  getCards(){
    this.cardService
      .getCards()
      .then(cards => this.cards = cards)
      .catch(error => this.error = error);
  }

  getSpecials(){
    this.specialService.getSpecials().then(dinos => {console.log(dinos);console.log("we are here");this.specials = dinos;}).catch(error => this.error = error);
  }

  createDeck(name:string, deckClass:string){
    this.deckName = name;
    this.deckClass = deckClass;
    this.deckCreated = true;
    this.deckService.addDeck(name, deckClass);
  }

  addToDeck(name:string, deckName:string, deckClass:string){
    if(this.deck.length <= 30) {
      let card = this.cards.find(x => x.name == name);
      let deck = new Deck();
      deck.name = this.deckName;
      deck.className = this.deckClass;
      let response = this.cardService.addToDeck(card, deck);
      this.deck.push(card);
      console.log(response);
    }
  }

  getAbilities(){
    console.log("Started");
    this.cardService.getAbilities().then(abilities => this.abilities = abilities).catch(error => this.error = error);
    console.log(this.abilities);
    console.log("Here");
  }

  addSpell(name:string, ability:string, desc:string){
    this.cardService.addSpell(name, ability, desc);
  }

}
