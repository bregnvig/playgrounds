import {Component, Input} from 'angular2/core'
import {IPlayground} from "../model/playground";
import {PlaygroundRatingComponent} from "../common/playground-rating";
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

  @Input()
  public playground:IPlayground;

  constructor(private _router:Router) { }

  public gotoDetails() {
    this._router.navigate(['Details', {id: this.playground.id}]);
  }
}