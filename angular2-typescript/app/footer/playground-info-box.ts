import {Component, Input} from 'angular2/core'
import {IPlayground} from "../model/playground";

@Component({
  selector: 'playground-info-box',
  template: `
    <footer *ngIf="playground">
        <h3>{{playground.navn}}</h3>
        <p>{{playground.adresseBeskrivelse}}</p>
        <p>{{playground.beskrivelse}}</p>
    </footer>`
})

export class PlaygroundInfoBoxComponent {
  @Input()
  public playground:IPlayground;
}