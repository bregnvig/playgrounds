/* tslint:disable:no-unused-variable */

import { ReactiveFormsModule } from '@angular/forms';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar';
import { FooterComponent } from './footer';
import { MapComponent } from './map';
import { PlaygroundService, LocationService } from './shared';
import { LeafletModule } from './leaflet';
import { Observable } from 'rxjs/Observable';
import { MOCK_PLAYGROUNDS } from './shared/mock-playgrounds';
import { DefaultDescriptionPipe, DistancePipe, HumanizeDistancePipe } from './shared/pipes';
import { routing } from './app.routing';

export const FakePlaygroundService = {
  provide: PlaygroundService,
  useValue: {
    getPlaygrounds() {
      return Observable.of(MOCK_PLAYGROUNDS);
    }
  }
};

describe('App: Playgrounds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeafletModule, routing, ReactiveFormsModule],
      declarations: [
        AppComponent,
        MapComponent,
        SidebarComponent,
        FooterComponent,
        DefaultDescriptionPipe,
        DistancePipe,
        HumanizeDistancePipe
      ],
      providers: [FakePlaygroundService, LocationService],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
