import {Component, Input} from 'angular2/core'
import {IPlayground} from "../model/playground";
import {PlaygroundRatingComponent} from "./playground-rating";
import {RouteHandler} from "angular2/src/router/rules/route_handlers/route_handler";
import {Router} from "angular2/router";

@Component({
  selector: 'playground-info-box',
  template: `
    <footer *ngIf="playground" (click)="gotoDetails()">
        <h3>{{playground.navn}} <playground-rating [playground]="playground"></playground-rating></h3>
        <p>{{playground.adresseBeskrivelse}}</p>
        <p>{{playground.beskrivelse}}</p>
    </footer>`,
  directives: [PlaygroundRatingComponent],
  styles: [`footer {cursor: pointer}`]
})

export class PlaygroundInfoBoxComponent {
  private _playground:IPlayground;

  constructor(private _router:Router) {
    
  }


  public gotoDetails() {
    this._router.navigate(['Details', {id: this.playground.id}]);
  }
  
  @Input()
  public get playground() {
    return this._playground;
  }
  public set playground(value:IPlayground) {
    this._playground = value;
  }
}