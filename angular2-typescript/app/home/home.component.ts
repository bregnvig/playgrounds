import {Component, OnInit} from 'angular2/core'
import {PlaygroundInfoBoxComponent} from "../footer/playground-info-box";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {IPlayground} from "../model/playground";
import {RouteParams} from "angular2/router";
import {PlaygroundService} from "../services/playgrounds";
import {LeafletComponent, IMarkers, ICenter} from "../map/map.component";
import {LocationService} from "../services/location";

@Component({
  templateUrl: 'app/home/home.tmpl.html',
  directives: [SidebarComponent, PlaygroundInfoBoxComponent, LeafletComponent]
})

export class PlaygroundHomeComponent implements OnInit {

  protected static DEFAULT_POSITION = new L.LatLng(56.360029, 10.746635);

  public playground:IPlayground;
  public center:ICenter = PlaygroundHomeComponent.DEFAULT_POSITION;
  public markers:IMarkers = {};

  constructor(private _locationService:LocationService) { }

  public ngOnInit() {
    this._locationService.current.subscribe(location => {
      console.log('Location', location); 
      this.markers['me'] = <L.LatLng>location
    });
  }
}

@Component({
  templateUrl: 'app/home/home.tmpl.html',
  directives: [SidebarComponent, PlaygroundInfoBoxComponent, LeafletComponent]
})
export class PlaygroundMapComponent extends PlaygroundHomeComponent implements OnInit {


  constructor(locationService:LocationService, private _routeParams:RouteParams, private _playgroundService:PlaygroundService) {
    super(locationService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this._playgroundService.find(this._routeParams.get('id')).subscribe(playground => {
      this.playground = playground;
      if (playground) {
        this.center = {
          lat: playground.position.lat,
          lng: playground.position.lng,
          zoom: 16
        };
        this.markers['playground'] = playground.position;
      }
    });
  }
}