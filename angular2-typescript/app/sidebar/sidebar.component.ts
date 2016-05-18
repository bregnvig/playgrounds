import {IPlayground} from "../model/playground";
import {PlaygroundService} from "../services/playgrounds";
import {RouterLink} from "angular2/router";
import {DistancePipe, HumanizeDistancePipe} from "./sidebar-pipes";
import {LocationService} from "../services/location";

import {Control} from "angular2/common";
import {Component, OnDestroy, OnInit, Input} from "angular2/core";
import {DefaultPlaceholderPipe} from "./sidebar-pipes";

@Component({
  selector: 'playground-sidebar',
  templateUrl: 'app/sidebar/sidebar.tmpl.html',
  directives: [RouterLink],
  pipes: [DistancePipe, HumanizeDistancePipe, DefaultPlaceholderPipe]
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _playgrounds: IPlayground[];
  private _currentPosition: ICoordinate;

  public playgrounds: IPlayground[];
  
  @Input('playground')
  public selectedPlayground: IPlayground;
  public filterControl = new Control();


  constructor(private _playgroundService: PlaygroundService, private _locationService: LocationService) {
  }

  public ngOnInit() {
    this._locationService.current
      .map(currentPosition => this._currentPosition = currentPosition)
      .merge(this._playgroundService.playgrounds.map(playgrounds => this._playgrounds = playgrounds))
      .subscribe(() => {
        if (this._playgrounds && this._currentPosition && this._playgrounds) {
          this._playgrounds.sort((a, b) => geolib.getDistance(a.position, this._currentPosition) - geolib.getDistance(b.position, this._currentPosition));
        }
      });
    this.filterControl.updateValue(sessionStorage['filterText'] || '');
    this.filterControl.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .startWith('')
      .merge(this._playgroundService.playgrounds.map(() => ''))
      .merge(this._locationService.current.map(() => this.filterControl.value))
      .subscribe(text => this.filter(text));
  }

  public ngOnDestroy():any {
    sessionStorage['filterText'] = this.filterControl.value;
  }

  private filter(text: string) {
    if (this._playgrounds) {
      const regexp = new RegExp(text || '', 'i');
      this.playgrounds = this._playgrounds.filter((playground: IPlayground, index: number, array: IPlayground[]) => !!playground.navn.match(regexp));
    }
  }
}