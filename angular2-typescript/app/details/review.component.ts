import {Component, Input} from 'angular2/core'
import {RatingComponent} from "../common/rating.component";

@Component({
  selector: 'review',
  template: `
    <div class="alert alert-info" role="alert">
        <p *ngIf="message">{{message}}</p>
        <p *ngIf="!message"><i>Vurdering</i></p>
        <p>
            <rating [readOnly]="true" [value]="stars"></rating>
        </p>
    </div>
  `,
  directives: [RatingComponent]
})
export class ReviewComponent {
  @Input()
  public message:string;

  @Input()
  public stars:number;
}