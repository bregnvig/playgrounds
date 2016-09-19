
import { Component, OnDestroy, AfterViewInit, Input } from '@angular/core';

import { Center } from './center';
import { Marker } from './marker';

import { TileLayer, Map, LatLng, control, Marker as LeafletMarker } from 'leaflet';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MarkerFactory } from './marker-factory';

/* tslint:disable:component-selector-name */
/* tslint:disable:component-selector-prefix */
@Component({
  selector: 'leaflet',
  templateUrl: 'leaflet.component.html',
  styleUrls: ['leaflet.component.css']
})
export class LeafletComponent implements AfterViewInit, OnDestroy {

  @Input() public mapId = 'leafletMap';

  public baseMaps: { [name: string]: TileLayer };
  private _map: Map;
  private _zoom = 8;
  private _center: LatLng;

  private _markers: Observable<Marker>;
  private _markersSubscription: Subscription;
  private _namedMarkers: { [key: string]: LeafletMarker } = {};



  constructor() {
    this.baseMaps = {
      OpenStreetMap: new TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    };
  }

  public ngAfterViewInit() {
    console.group('Map configuration');
    console.log('Id', this.mapId);
    console.log('Using zoom', this._zoom);
    console.log('Center', JSON.stringify(this._center));
    console.groupEnd();
    this._map = new Map(this.mapId, {
      zoomControl: false,
      center: this._center,
      zoom: this._zoom,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.baseMaps['OpenStreetMap']]
    });
    control.zoom({ position: 'topleft' }).addTo(this._map);
    control.scale().addTo(this._map);
    this.subscribe();
  }

  public ngOnDestroy() {
    if (this._markersSubscription) {
      this._markersSubscription.unsubscribe();
    }
  }

  @Input()
  public set center(center: Center) {
    console.log('Updating center', center, this._zoom);
    this._center = center ? new LatLng(center.latitude, center.longitude) : null;
    if (center && center.zoom) {
      this._zoom = center.zoom;
    }
    if (this._map && center) {
      this._map.setView(this._center, this._zoom);
    }
  }

  @Input() public set markers(value: Observable<Marker>) {
    this._markers = value;
    this.subscribe();
  }

  @Input()
  public set zoom(zoom: number) {
    console.log('Setting zoom', zoom);
    this._zoom = zoom;
    if (this._map) {
      this._map.setZoom(zoom);
    }
  }

  private subscribe() {
    if (this._markers && !this._markersSubscription && this._map) {
      this._markersSubscription = this._markers.subscribe(marker => this.addMarker(marker));
    }
  }

  private addMarker(marker: Marker): L.Marker {

    this.removeMarker(marker.name);
    if (marker.hasPosition) {
      const position = new LatLng(marker.latitude, marker.longitude);
      console.log('Adding marker', position);
      this._namedMarkers[marker.name] = MarkerFactory.newMarker(position, false, marker.message).addTo(this._map);
      return this._namedMarkers[marker.name];
    }
  }

  private removeMarker(name: string): void {
    if (this._namedMarkers[name]) {
      console.log('Removing marker', name, this._namedMarkers[name].getLatLng());
      this._map.removeLayer(this._namedMarkers[name]);
      this._namedMarkers[name] = undefined;
    }
  }



}
