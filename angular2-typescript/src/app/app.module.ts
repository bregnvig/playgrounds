import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from './leaflet';
import { FooterComponent } from './footer';
import { MapComponent } from './map';
import { routing } from './app.routing';
import SharedModule from './shared/shared.module';
import { ReviewModule } from './rating/review.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    LeafletModule,
    ReviewModule,
    routing,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MapComponent,
    FooterComponent,
    SidebarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
