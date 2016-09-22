import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LeafletModule } from './leaflet';
import { SidebarComponent } from './sidebar';
import { FooterComponent } from './footer';
import { MapComponent } from './map';
import { DetailsComponent } from './details/details.component';

import { PlaygroundService, LocationService } from './shared';
import { DefaultDescriptionPipe, DistancePipe, HumanizeDistancePipe } from './shared/pipes';

import { routing } from './app.routing';
import { RatingModule } from './rating/rating.module';
import { RatingResolveService } from './shared/rating-resolve.service';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    LeafletModule,
    RatingModule,
    routing,
  ],
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    FooterComponent,
    DefaultDescriptionPipe,
    DistancePipe,
    HumanizeDistancePipe,
    DetailsComponent,
    ReviewComponent
  ],
  providers: [
    PlaygroundService,
    LocationService,
    RatingResolveService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
