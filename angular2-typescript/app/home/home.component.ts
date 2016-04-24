import {Component, OnInit} from 'angular2/core'
import {PlaygroundInfoBoxComponent} from "../footer/playground-info-box";
import {SidebarComponent} from "../sidebar/sidebar";
import {IPlayground} from "../model/playground";
import {RouteParams} from "angular2/router";
import {PlaygroundService} from "../services/playgrounds";

@Component({
  templateUrl: 'app/home/home.tmpl.html',
  directives: [SidebarComponent, PlaygroundInfoBoxComponent]
})

export class PlaygroundHomeComponent {
  public playground:IPlayground;
}

@Component({
  templateUrl: 'app/home/home.tmpl.html',
  directives: [SidebarComponent, PlaygroundInfoBoxComponent]
})
export class PlaygroundMapComponent extends PlaygroundHomeComponent implements OnInit {


  constructor(private _routeParams:RouteParams, private _playgroundService:PlaygroundService) {
    super();
  }

  public ngOnInit() {
    this._playgroundService.find(this._routeParams.get('id')).subscribe(playground => this.playground = playground);
  }
}