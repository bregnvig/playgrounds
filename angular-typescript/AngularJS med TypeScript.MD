# AngularJS med TypeScript

## Introduktion
AngularJS er blevet populært hos mange danske virksomheder. En af de attraktive ting ved AngularJS er at man finder mange af de samme dyder i AngularJS som man finder i eksempelvis Java.

Man har “separation of concern” som klart definerer hvorledes ens applikation bør opsplittes. Vi har vores services til vores forretningslogik, vi har vores controllers til at dirigere sammenhængen med brugergrænsefladen og forretningslogikken. Vi har vores directives og filters til vores præsentation osv.

Alt dette gør det nemmere for folk med erfaring i det klassiske MVC mønster at komme i gang. Samtidigt får man delt sin kode op i mindre bidder, som dermed både er lettere at genbruge, men bestemt også lettere at teste.

Men et problem blev ikke løst. Problemet med de manglende typer. Løsning mulighed: [TypeScript](http://www.typescriptlang.org/). Hvad er [TypeScript](http://www.typescriptlang.org/)? I følge Microsoft:

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

Så med [TypeScript](http://www.typescriptlang.org/) får vi igen interfaces, klasser, generics etc.

## Case - Legepladser
I forbindelse med jeg har afholdt [AngularJS foundation](https://www.lundogbendsen.dk/undervisning/beskrivelse/LB1730/JS+-+AngularJS+-+Foundation;jsessionid=C8B2C9CCCEA83B5B27A05BFB76BDC4E3) kurser for Lund&Bendsen, har kursisterne skulle udvikle en lille applikation, som benytter sig af [Copenhagen Data](http://data.kk.dk/) til at vise en liste af legepladser i København.

![Playgrounds screenshot](screenshot.png)

Applikationen er skrevet i ren JavaScript med AngularJS. Men hvad kræver det at gå fra en type løs applikation til en AngularJS applikation der benytter [TypeScript](http://www.typescriptlang.org/)? Lad os se på de forskellige dele.

### Modellen
Der er umiddelbart to modeller i denne case. Der er modellen man får fra Copenhagen Data og så er der den interne model. Når vi benytter ren Javascript er modellen ikke defineret, mens vi med TypeScript kan og bør definere disse to modeller. Dette kan man gøre vha. interfaces. Den interne legeplads er defineret således:

```javascript
export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IPlayground {
  id: string;
  navn: string;
  adresseBeskrivelse?: string;
  beskrivelse?: string;
  position: ICoordinate;
}
```
Dette interface fortæller at legeplads objektet **skal** have `id`, `navn` og `position`. Legeplads objektet **kan** have `adresseBeskrivelse` og `beskrivelse`. Dette kan ses via `?` der står efter navnet. Hvad giver det af fordele?

#### Compiling

Hvis vi ved en fejl benytter `name` i stedet for `navn`, ville det være en fejl vi først ville finde på runtime når vi bruger Javascript. Når vi benytter [TypeScript](http://www.typescriptlang.org/) får vi fejlen på compile time.

```
>> app/scripts/map/map.ts(58,22): error TS2339: Property 'name' does not exist on type 'IPlayground'.
```

Dette synes jeg er en kæmpe fordel.

#### IDE
En anden fordel ved defineret typer, eks. `IPlayground`, er at vores IDE nu kan hjælpe os.

Vi har nu Code Completion, da vores IDE kender typerne:

![Code Completion](CodeCompletion.png)

Som vi kan se kender vores IDE ikke bare `IPlayground`'s egne properties, men også de nedarvet properties, eks. `toString`

Uden `IPlayground` typen er vores IDE til stortset ingen hjælp:

![No Code Completion](NoCodeCompletion.png)

### Service

I vores case med legepladser skal kursisterne lave en service der henter legepladserne fra Copenhagen Data. Servicen har en metode der returnere et promise, der når legepladserne er hentet, afleverer et array med `IPlayground`s.

Med TypeScript benytter vi classes til vores service. Og på samme måde som med vores model, opretter vi et interface der beskriver de funktioner vores service skal implementere. I denne case kommer interfacet til at se således ud:

```java
export interface IPlaygroundService {
  playgrounds(): angular.IPromise<IPlayground[]>;
  find(id: string): angular.IPromise<IPlayground>;
}
```
Selve servicen bliver til en klasse der implementere vores interface:

```java
class PlaygroundService implements IPlaygroundService {
  public playgrounds(): angular.IPromise<IPlayground[]> {
    ...
  }

  public find(id: string): angular.IPromise<IPlayground> {
    ...
  }
}

```
Det er desværre ikke specielt elegant at få registeret en service i AngularJS, når man benytter TypeScript klasser til sine services. Men med en relativ simple statisk factory metode på klassen fungerer det nogenlunde:

```java
class PlaygroundService implements IPlaygroundService {

  ...

  public static factory() {
    const service = ($http: angular.IHttpService, location: ILocationService) => {
      return new PlaygroundService($http, location);
    };
    service.$inject = ['$http', 'location'];
    return service;
  }
}

angular.module('playgrounds')
  .factory('playgroundService', PlaygroundService.factory());

```

Når `IPlaygroundService` bliver injected vil vores IDE hjælpe os med hvilken funktioner vi kan kalde og vores kompiler vil give fejl, hvis vi kalder funktioner der ikke findes.

Eksempel hvor jeg benytter servicen i en controller.

```java
class MapCtrl implements IMapScope {

  public playgrounds: IPlayground[];

  constructor($scope: angular.IScope, private $routeParams: angular.route.IRouteParamsService, playgroundService: IPlaygroundService, location: ILocationService) {
    playgroundService.playgrounds().then((playgrounds) => {
      this.playgrounds = playgrounds;
    });
    ...
  }
}
```
Hvis vi kigger i vores IDE, kan man se at typen er kendt.

![Kendt type](KnownType.png)

I dette eksempel kan vi se at IDE'et kender returtypen `angular.IPromise<IPlayground[]>` fra vores `playgrounds()` function.


### Controller

Når vi benytter TypeScript bliver alle controllers skrevet vha. klasser. Det er let at benytte controllerAs syntax sammen med TypeScript, hvilket også er den syntax jeg vil benytte i eksemplet. Eksemplet jeg vil vise er den kontroller der benyttes til at håndtere kortet og listen af legepladser.

Vi starter med at definere de properties og funktioner som vores UI har brug for:

```java
interface IMapScope {
  filterTextService: IFilterTextService;
  markers: IMarker;
  playgroundCenter: ICoordinate;
  playgrounds: IPlayground[];
  selectedPlayground: IPlayground;
}
```

Efterfølgende implementerer vi selve klassen.

I TypeScript har vi en constructor i klassen. Vi benytter denne til at få injected de afhængigheder controlleren har.

```java
class MapCtrl implements IMapScope {

  public static $inject = ['$scope', '$routeParams', 'playgroundService', 'location', 'filterTextService'];

  public playgrounds: IPlayground[];
  public selectedPlayground: IPlayground;
  public markers: IMarker = {};
  public playgroundCenter: ICoordinate = new MapCenter(new Coordinate(56.360029, 10.746635), 8);


  constructor(private $routeParams: IRouteParamsService, playgroundService: IPlaygroundService, location: ILocationService, public filterTextService: IFilterTextService) {
    if ($routeParams['id']) {
      playgroundService.find($routeParams['id']).then((playground) => {
        this.selectedPlayground = playground;
        this.markers['playground'] = new MapMarker(playground.position, playground.navn);
        this.playgroundCenter = new MapCenter(playground.position);
      });
    }
    playgroundService.playgrounds().then((playgrounds) => {
      this.playgrounds = playgrounds;
    });
    location.get().then((coordinates) => {
      this.markers['meMarker'] = new MapMarker(coordinates, 'Her er jeg');
    });
  }
}

angular.module('playgrounds')
  .controller('MapCtrl', MapCtrl);  
```
Constructoren er også stedet vi udfører de ting der skal ske i forbindelse med at controlleren starter op. I dette tilfælde henter vi legepladserne, og hvis der er valgt en specifik legeplads, så henter vi også denne.
