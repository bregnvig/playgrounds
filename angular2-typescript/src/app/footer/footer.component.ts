import { Component, Input } from '@angular/core';
import { Playground, Summary } from '../shared';
@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {

  @Input() public playground: Playground;
  @Input() public summary: Summary;

}
