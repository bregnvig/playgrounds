import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundService, LocationService } from './';
import { PlaygroundResolveService } from './playground-resolve.service';
import { RatingResolveService } from './rating-resolve.service';
import { HttpModule } from '@angular/http';
import { HumanizeDistancePipe, DistancePipe, DefaultDescriptionPipe } from './pipes';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [
    DefaultDescriptionPipe,
    DistancePipe,
    HumanizeDistancePipe,
  ],
  exports: [
    CommonModule,
    DefaultDescriptionPipe,
    DistancePipe,
    HumanizeDistancePipe,
  ],
})
export default class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PlaygroundService,
        PlaygroundResolveService,
        RatingResolveService,
        LocationService,
      ],
    };
  }
}
