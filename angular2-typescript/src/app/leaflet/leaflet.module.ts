import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletComponent } from './leaflet.component';

@NgModule({
    declarations: [LeafletComponent],
    imports: [CommonModule],
    exports: [LeafletComponent]
})
export class LeafletModule { }
