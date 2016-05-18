import {Component, Input, DoCheck, AfterViewInit} from 'angular2/core';

export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IMarkers {
  [key: string]: ICoordinate;
}

export interface ICenter {
  lat: number;
  lng: number;
  zoom?: number;
}

@Component({
  selector: 'leaflet',
  template: `
    <div class="leaflet-100" [id]="mapId"></div>
  `,
  styles: [`
    .leaflet-100 {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
  `]
})
export class LeafletComponent implements AfterViewInit, DoCheck {

  @Input() public mapId = 'leafletMap';

  public baseMaps: {[name: string]: L.TileLayer};

  private _map: L.Map;
  private _zoom = 8;
  private _center: L.LatLng;
  private _markers: IMarkers;
  private _namedMarkers: {[key: string]: L.Marker} = {};

  constructor() {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    };
  }

  public ngAfterViewInit() {
    console.group('Map configuration');
    console.log('Id', this.mapId)
    console.log('Using zoom', this._zoom);
    console.log('Center', JSON.stringify(this._center));
    console.groupEnd();
    this._map = new L.Map(this.mapId, {
      zoomControl: false,
      center: this._center,
      zoom: this._zoom,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.baseMaps['OpenStreetMap']]
    });
    L.control.zoom({position: 'topleft'}).addTo(this._map);
    L.control.scale().addTo(this._map);
  }

  public ngDoCheck() {

    if (this._map) {
      // Remove and update
      Object.keys(this._namedMarkers).forEach(name => {
        const marker = this._markers[name];
        if(!marker) {
          this.removeMarker(name);
        } else {
          const latlng = (this._namedMarkers[name]).getLatLng();
          if(marker.lat !== latlng.lat || marker.lng !== latlng.lng) {
            this.addMarker(name, marker);
          }
        }
      });
      // Add new
      Object.keys(this._markers).forEach(name => {
        if(!this._namedMarkers[name] && this._markers[name]) {
          this.addMarker(name, this._markers[name]);
        }
      });
    }

  }

  private addMarker(name: string, coordinate: ICoordinate): L.Marker {

    const position = new L.LatLng(coordinate.lat, coordinate.lng);

    console.log('Adding marker', position);
    this.removeMarker(name);
    this._namedMarkers[name] = MarkerFactory.newMarker(position).addTo(this._map);
    return this._namedMarkers[name];
  }

  private removeMarker(name: string): void {
    if(this._namedMarkers[name]) {
      console.log('Removing marker', name, this._namedMarkers[name].getLatLng());
      this._map.removeLayer(this._namedMarkers[name]);
      this._namedMarkers[name] = undefined;
    }
  }

  @Input()
  public set center(center: ICenter) {
    console.log('Updating center', center, this._zoom);
    this._center = center ? new L.LatLng(center.lat, center.lng) : null;
    if (center && center.zoom) {
      this._zoom = center.zoom;
    }
    if(this._map && center) {
      this._map.setView(this._center, this._zoom);
    }
  }

  @Input()
  public set zoom(zoom: number) {
    console.log('Setting zoom', zoom);
    this._zoom = zoom;
    if(this._map) {
      this._map.setZoom(zoom);
    }
  }


  @Input()
  public set markers(value: IMarkers) {
    if(this._namedMarkers && this._map) {
      Object.keys(this._namedMarkers).forEach((name) => this.removeMarker(name));
      this._namedMarkers = {};
    }
    this._markers = value;
  }
}

class MarkerFactory {
  private static BASE_64_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==';
  private static BASE_64_SHADOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=';

  public static newMarker(position: L.LatLng, draggable: boolean = false): L.Marker {
    return L.marker(position, {
      icon: L.icon({
        iconUrl: MarkerFactory.BASE_64_ICON,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: MarkerFactory.BASE_64_SHADOW
      }),
      draggable: draggable
    })
  }
}
