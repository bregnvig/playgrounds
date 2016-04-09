import {Component, Output, EventEmitter} from "angular2/core";
import {IPlayground} from "../model/playground";
import {PlaygroundService} from "../services/playgrounds";
@Component({
  selector: 'playground-sidebar',
  templateUrl: 'app/sidebar/sidebar.tmpl.html'
})
export class SidebarComponent {

  private _playgrounds: IPlayground[];

  public playgrounds: IPlayground[];
  public selectedPlayground: IPlayground;

  @Output()
  private onSelected = new EventEmitter<IPlayground>();

  constructor(playgroundService: PlaygroundService) {
    playgroundService.playgrounds.then((playgrounds) => this._playgrounds = this.playgrounds = playgrounds);
  }

  public selectPlayground(playground: IPlayground) {
    this.selectedPlayground = playground;
    this.onSelected.emit(playground);
  }

  public set filterText(value: string) {
    const regexp = new RegExp(value, 'i');
    this.playgrounds = this._playgrounds.filter((playground: IPlayground, index: number, array: IPlayground[]) => !!playground.navn.match(regexp));
  }

}