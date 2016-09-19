export class Marker {

    constructor(private _name: string, private _latitude: number, private _longitude: number, private _message = '') { }

    public get name() {
        return this._name;
    }
    public get latitude() {
        return this._latitude;
    }
    public get longitude() {
        return this._longitude;
    }

    public get message() {
        return this._message;
    }

    public get hasPosition(): boolean {
        return !!this.latitude && !!this.longitude;
    }
}
