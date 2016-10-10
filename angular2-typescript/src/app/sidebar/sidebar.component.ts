import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Playground, PlaygroundService, LocationService } from '../shared';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public playgrounds: Playground[];

  private filterControl: FormControl = new FormControl();

  constructor(private playgroundService: PlaygroundService, private locationService: LocationService) {
  }

  public ngOnInit() {
    console.log('SidebarComponent is being initialized');

    const filter$ = this.filterControl
      .valueChanges
      .startWith('')
      .debounceTime(200)
      .distinctUntilChanged()
      .map(text => text.toLocaleLowerCase())
      .combineLatest(this.playgroundService.getPlaygrounds(), (text, playgrounds) =>
        playgrounds.filter((playground: Playground) => playground.name.toLocaleLowerCase().includes(text))
      );
    Observable.combineLatest(filter$, this.locationService.current.startWith(null), (playgrounds, location) => {
      const l = this.locationService;
      return location ? playgrounds.sort((a: Playground, b: Playground) => l.getDistance(a.position, location) - l.getDistance(b.position, location)) : playgrounds;
    })
      .catch(error => filter$)
      .subscribe(playgrounds => this.playgrounds = playgrounds);
  }

  public ngOnDestroy() {
    console.log('SidebarComponent is being destroyed');
  }
}
