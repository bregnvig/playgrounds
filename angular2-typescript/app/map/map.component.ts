import {Injectable, Component, Input, OnInit} from 'angular2/core';
import {Map} from 'leaflet';



@Component({
  selector: 'leaflet',
  template: `
    <div class="leaflet-100" [id]="mapId"></div>
  `,
  styles: [`
    .leaflet-100 {
        width: 100%;
        height: 100%;
    }
  `]
})

export class LeafletComponent implements OnInit {

  @Input() public mapId = 'leafletMap';

  @Input()
  public center:L.LatLng;

  public baseMaps:{[name:string]:L.TileLayer};

  constructor() {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      })
    };
  }

  ngOnInit() {

  }


  public disableMouseEvent(tag: string) {
    var html = L.DomUtil.get(tag);

    L.DomEvent.disableClickPropagation(html);
    L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
  };


  public ngAfterViewInit() {
    // if (!this.center) {
    //   console.log('Map center not defined', this.center);
    //   throw new Error('Center must be defined');
    // }

    var map = new L.Map(this.mapId, {
      zoomControl: false,
      center:  new L.LatLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.baseMaps['OpenStreetMap']]
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.layers(this.baseMaps).addTo(map);
    L.control.scale().addTo(map);

  }

}
