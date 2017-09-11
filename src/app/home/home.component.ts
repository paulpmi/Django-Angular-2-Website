import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by paulp on 6/20/2017.
 */

@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  }
)
export class HomeComponent implements OnInit
{
  selectGame : boolean;
  selectAI : boolean;
  selectWeb : boolean;

  constructor(private router:Router) {} // class contructor

  ngOnInit() {
    this.selectGame = false;
    this.selectAI = false;
    this.selectWeb = false;
  } // when page boots

  onClickGame(){
    if (this.selectGame == false)
      this.selectGame = true;
    else
      this.selectGame = false;
  }

  onClickAI(){
    if (this.selectAI == false)
      this.selectAI = true;
    else
      this.selectAI = false;
  }

  onClickWeb(){
    if (this.selectWeb == false)
      this.selectWeb = true;
    else
      this.selectWeb = false;
  }

}
