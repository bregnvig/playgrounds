import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from './leaflet';
import { SidebarComponent } from './sidebar';
import { FooterComponent } from './footer';
import { MapComponent } from './map';
import { SharedModule } from './shared/shared.module';
import { ReviewModule } from './rating/review.module';
import { PlaygroundsRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    LeafletModule,
    ReviewModule,
    PlaygroundsRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
