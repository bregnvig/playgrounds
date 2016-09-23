import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Playground, Summary } from '../shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {


  @Input()
  public playground: Playground;
  public summary: Summary;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((data: {summary: Summary}) => this.summary = data.summary);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
