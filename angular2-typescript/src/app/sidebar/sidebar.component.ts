import { Component, OnInit } from '@angular/core';
import { PlaygroundService, Playground, LocationService } from '../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public playgrounds$: Observable<Playground[]>;

  constructor(private readonly playgroundService: PlaygroundService, private readonly locationService: LocationService) { }

  ngOnInit() {
    this.playgrounds$ = this.locationService.current
      .startWith(null)
      .combineLatest(this.playgroundService.getPlaygrounds(), (location, playgrounds: Playground[]) => {
        return location ? playgrounds.sort((a, b) => {
          return this.locationService.getDistance(a.position, location) - this.locationService.getDistance(b.position, location);
        }) : playgrounds;
      });
  }

}
