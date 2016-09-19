export class Center {
    constructor(private _latitude: number, private _longitude: number, private _zoom?: number) {
    }

    public get latitude() {
        return this._latitude;
    }

    public get longitude() {
        return this._longitude;
    }

    public get zoom() {
        return this._zoom;
    }
}
