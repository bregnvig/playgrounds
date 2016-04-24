import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'rating-star',
  template: `<i class="fa" [class.fa-star-o]="empty" [class.fa-star]="full" [class.fa-star-half-o]="half"></i>`
})
export class RatingStar {
  @Input('full-value')
  public fullValue:number;

  @Input()
  public value:number = 0;

  public get empty() {
    return !this.value || this.value - this.fullValue < -0.5;
  }
  public get full() {
    return this.value - this.fullValue >= 0;
  }
  public get half() {
    return this.value - this.fullValue >= -0.5 && !this.full;
  }
}

@Component({
  selector: 'rating',
  template: `
    <rating-star [class.clickable]="!readOnly" [full-value]="1" [value]="value" (click)="setValue(1)"></rating-star><rating-star [class.clickable]="!readOnly" [full-value]="2" [value]="value" (click)="setValue(2)"></rating-star><rating-star [class.clickable]="!readOnly" [full-value]="3" [value]="value" (click)="setValue(3)"></rating-star><rating-star [class.clickable]="!readOnly" [full-value]="4" [value]="value" (click)="setValue(4)"></rating-star><rating-star [class.clickable]="!readOnly" [full-value]="5" [value]="value" (click)="setValue(5)"></rating-star>
  `,
  directives: [RatingStar],
})
export class RatingComponent {

  @Output()
  public onChanged = new EventEmitter<number>();

  @Input()
  public value:number;
  @Input()
  public readOnly:boolean;

  public setValue(value:number) {
    if (!this.readOnly) {
      this.value = value;
      this.onChanged.emit(value);
    }
  }
}
