import { Component, OnInit } from '@angular/core';
import { PlaygroundService, Playground, LocationService } from '../shared';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public playgrounds$: Observable<Playground[]>;
  public filterControl: FormControl;

  constructor(private readonly playgroundService: PlaygroundService, private readonly locationService: LocationService) {
  }

  ngOnInit() {
    this.filterControl = new FormControl();
    this.playgrounds$ = this.filterControl.valueChanges
      .startWith('')
      .debounceTime(200)
      .distinctUntilChanged()
      .map(text => text.toLocaleLowerCase())
      .combineLatest(this.playgroundService.getPlaygrounds(), (text, playgrounds) =>
        playgrounds.filter(playground => playground.name.toLocaleLowerCase().includes(text))
      )
      .combineLatest(this.locationService.current.startWith(null), (playgrounds, location) => {
        return location ? playgrounds.sort((a: Playground, b: Playground) => {
          return this.locationService.getDistance(a.position, location) - this.locationService.getDistance(b.position, location);
        }) : playgrounds;
      });
  }

}
