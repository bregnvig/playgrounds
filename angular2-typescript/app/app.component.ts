import {Component} from 'angular2/core'
import {SidebarComponent} from "./sidebar/sidebar";
import {PlaygroundService} from "./services/playgrounds";
import {HTTP_PROVIDERS} from "angular2/http";
import {PlaygroundInfoBoxComponent} from "./footer/playground-info-box";
import {IPlayground} from "./model/playground";

@Component({
  selector: 'playgrounds',
  template: `
    <playground-sidebar (onSelected)="playground=$event"></playground-sidebar>
    <playground-info-box [playground]="playground"></playground-info-box>
  `,
  directives: [SidebarComponent, PlaygroundInfoBoxComponent],
  providers: [PlaygroundService, HTTP_PROVIDERS]
})

export class AppComponent {
  public playground:IPlayground;
}