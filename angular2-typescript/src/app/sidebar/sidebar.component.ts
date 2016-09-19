import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Playground, PlaygroundService, LocationService } from '../shared';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public playgrounds: Playground[];
  @Output('playground-selected')
  public playgroundSelected = new EventEmitter<Playground>();

  private filterControl: FormControl = new FormControl();
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private playgroundService: PlaygroundService, private locationService: LocationService) { }

  public ngOnInit() {
    console.log('SidebarComponent is being initialized');

    this.subscription = this.activatedRoute.params
      .map(params => params['id'])
      .filter(id => id)
      .mergeMap(id => this.playgroundService.find(id))
      .subscribe((playground: Playground) => this.playgroundSelected.emit(playground));
    this.filterControl
      .valueChanges
      .startWith('')
      .debounceTime(200)
      .distinctUntilChanged()
      .combineLatest(this.playgroundService.getPlaygrounds(), (text, playgrounds) => {
        return playgrounds.filter(playground => playground.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
      })
      .combineLatest(this.locationService.current, (playgrounds, location) => {
        const l = this.locationService;
        return playgrounds.sort((a, b) => l.getDistance(a.position, location) - l.getDistance(b.position, location));
      })
      .subscribe(playgrounds => this.playgrounds = playgrounds);
  }

  public ngOnDestroy() {
    console.log('SidebarComponent is being destroyed');
    this.subscription.unsubscribe();
  }
}
