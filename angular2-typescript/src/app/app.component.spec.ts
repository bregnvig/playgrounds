/* tslint:disable:no-unused-variable */
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar';
import { FooterComponent } from './footer';
import { MapComponent } from './map';
import { PlaygroundService, LocationService } from './shared';
import { LeafletModule } from './leaflet';
import { Observable } from 'rxjs';
import { MOCK_PLAYGROUNDS } from './shared/mock-playgrounds';
import { DefaultDescriptionPipe, DistancePipe, HumanizeDistancePipe } from './shared/pipes';
import { routing } from './app.routing';
import { ReviewModule } from './rating/review.module';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

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
      imports: [
        LeafletModule,
        RouterTestingModule,
        routing,
        ReactiveFormsModule,
        ReviewModule,
      ],
      declarations: [
        AppComponent,
        MapComponent,
        SidebarComponent,
        FooterComponent,
        DefaultDescriptionPipe,
        DistancePipe,
        HumanizeDistancePipe,
      ],
      providers: [FakePlaygroundService, LocationService, {
        provide: APP_BASE_HREF,
        useValue: '/',
      }],
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

  it('should have router-outlet tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
