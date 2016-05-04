import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {PlaygroundHomeComponent, PlaygroundMapComponent} from "./home/home.component";
import {PlaygroundService} from "./services/playgrounds";
import {HTTP_PROVIDERS} from "angular2/http";
import {LocationService} from "./services/location";
import {RatingService} from "./services/rating.service";
import {PlaygroundDetailsComponent} from "./details/details.component";
import {ReviewServiceFactory} from "./services/review.service";

@Component({
  selector: 'playgrounds',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, PlaygroundService, LocationService, RatingService, ReviewServiceFactory],
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: PlaygroundHomeComponent,
    useAsDefault: true
  },
  {
    path: '/playground/:id',
    name: 'Playground',
    component: PlaygroundMapComponent
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: PlaygroundDetailsComponent
  },
])
export class AppComponent {
}

