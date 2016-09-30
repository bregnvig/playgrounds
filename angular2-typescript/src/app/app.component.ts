import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public slowChangingRoute = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events
      .debounce(() => Observable.interval(this.slowChangingRoute ? 1 : 500))
      .map((event: Event) => event instanceof NavigationEnd)
      .subscribe(hide => this.slowChangingRoute = !hide);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

