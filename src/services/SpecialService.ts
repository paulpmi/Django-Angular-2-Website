import {Injectable} from "@angular/core";
import {Special} from "../common/Special";
import {Http} from "@angular/http";
import {Headers} from '@angular/http';
/**
 * Created by paulp on 7/19/2017.
 */


@Injectable()
export class SpecialService{
  urlbasic = "http://localhost:8000/specials/?format=json";
  urlAdd = "http://localhost:8000/addSpecial/";
  urlGet = "http://localhost:8000/getSpecial/";
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  addSpecial(special:string){
    return this.http.post(this.urlAdd, JSON.stringify(special), {headers: this.headers})
      .map(response => response.json()).subscribe(data => {
        console.log("Data is:",data);
      },error=>{
        console.log(error);
      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getSpecials() {
    console.log("JERE");

    return this.http.get(this.urlbasic)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

}
