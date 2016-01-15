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

![Playgrounds screenshot](assets/screenshot.png)

Applikationen er skrevet i ren JavaScript med AngularJS. Men hvad kræver det at gå fra en type løs applikation til en AngularJS applikation der benytter [TypeScript](http://www.typescriptlang.org/)? Lad os se på de forskellige dele.

### Modellen
Der er umiddelbart to modeller i denne case. Der er modellen man får fra Copenhagen Data og så er der den interne model. Når vi benytter ren Javascript er modellen ikke defineret, mens vi med TypeScript kan og bør definere disse to modeller. Dette kan man gøre vha. interfaces. Den interne legeplads er defineret således:

```java
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

![Code Completion](assets/CodeCompletion.png)

Som vi kan se kender vores IDE ikke bare `IPlayground`'s egne properties, men også de nedarvet properties, eks. `toString`

Uden `IPlayground` typen er vores IDE til stortset ingen hjælp:

![No Code Completion](assets/NoCodeCompletion.png)

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

![Kendt type](assets/KnownType.png)

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
```
Constructoren er også stedet vi udfører de ting der skal ske i forbindelse med at controlleren starter op. I dette tilfælde henter vi legepladserne, og hvis der er valgt en specifik legeplads, så henter vi også denne.

Lig mærke til `$inject`. Dette statiske string array er nødvendigt, hvis vi ønsker at kunne uglify vores JS kode.

Hvor det er en lille smule bøvlet at registere en service med AngularJS og TypeScript, er det super simpelt med controllers. Her angiver vi blot vores klasse som controller function.

```javascript
angular.module('playgrounds')
  .controller('MapCtrl', MapCtrl);  
```

Fordelen ved at have sin controllers i TypeScript er at vi får kompiler og IDE support under udviklingen af controlleren. Desværre kan Webstorm ikke endnu hjælpe når vi først er i vores HTML templates.

### Directives

Når vi laver directives laver vi det på samme måde som services og controllers. Vi laver det med klasser. Klassen vi implementere skal implementere `angular.IDirective`.

```java
class MyRating implements angular.IDirective {
  public restrict = 'E';
  public templateUrl = 'scripts/common/directives/my-rating.tmpl.html';
  public bindToController = {
    rating: '=',
    readOnly: '='
  };
  public scope = {};
  public controllerAs = 'vm';
  public controller = MyRatingController;

  public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, vm: MyRatingController) {
    ...
  }
```

Som man ser her, så kan de enkelte konfigurations properties blot defineres direkte på klassen.

Det giver os muligheden for senere at nedarve fra denne klasse og lave en variant af vores directive. Jeg har ikke selv haft dette behov, men muligheden eksistere i hvert fald, når vi benytter klasser til vores directives.

Som det kan ses fra eksemplet er det selvfølgelig også muligt at benytte `bindToController` istedet for isolated `scope`, når man benytter TypeScript.

Lige som med services, er det lidt bøvlet at registere et directive der er lavet som klasse i angular. Det er dog den præcis som metode som med services.

```java
class MyRating implements angular.IDirective {

  ...

  public static factory() {
    const directive = (): angular.IDirective => {
      return new MyRating();
    };
    return directive;
  }
}

angular.module('playgrounds')
  .directive('myRating', MyRating.factory());
```

### Filters

Selvom vi ikke implementere filter som klasser kan vi godt få glæde at TypeScript typer, selvom det mest er ved udviklingen af filteret og ikke ved brug af filteret.

I forbindelse med kurset skal kursisterne lave et `distance` filter. Dette filter skal vha. din position og legepladsens position beregne afstanden mellem de to. Lad os starte med at definere interfacet for denne operation:

```java
export interface IDistanceFilter {
  (position: ICoordinate): string|number;
}
```

Som vi kan se fra `IDistanceFilter` så beskriver interface én funktion som tager én parameter, som er af type ICoordinate. Filter funktionen returnere enten en string eller et nummer. Dette skyldes at hvis din position ikke er fastlagt, så kan distancen ikke beregnes, og der returneres i stedet for beskeden 'Ukendt'.

Næste skridt er at lave filteret der returnere en filter funktion der implementere `IDistanceFilter`.
```java
const distance = (location: ILocationService): IDistanceFilter => {

  let currentPosition: ICoordinate;

  location.get().then((position) => {
    currentPosition = position;
  });

  return (position: ICoordinate): number|string => {
    if (currentPosition && position) {
      return geolib.getDistance(currentPosition, position);
    }
    return 'Ukendt';
  };
};
distance.$inject = ['location'];
```
Vi opretter en distance function som tager en parameter. Denne `location` parameter vil blive dependency injected af AngularJS. Funktionen selv returnere en funktion der implementere vores `IDistanceFilter`.

Sidst tilføjer vi vores `$inject` property, for at vores filter kan fungerer med [uglify](https://github.com/gruntjs/grunt-contrib-uglify).

At registere vores filter med AngularJS er super simpelt:

```java
angular.module('playgrounds')
  .filter('distance', distance);
```
Når vi benytter vores filter i en template får vi desværre ikke hjælp fra Webstorm. Dvs. at der er ingen compile checking etc. Dog giver vores interface os en fordel, hvis vi injecter vores filter i en controller, i en service, eller når vi injecter den i vores test af filteret.

```java
distance = _$filter_<IDistanceFilter>('distance');
```

## Opsummering

Der er masse af fordele ved at benytte TypeScript når man udvikler AngularJS applikationer. TypeScript's syntax er relativ simpelt at gå til og den lidt anderledes syntax når vi skriver vores AngularJS kode er ikke svær at blive fortrolig med.

Det er besværtligt at skrive AngularJS med TypeScript, hvis man ikke benytter sig af tools som eksempel [grunt](http://gruntjs.com/) eller [gulp](http://gulpjs.com/). På den ene side kan man argumentere for at hvem skriver alligevel AngularJS applikationer uden tools, mens man på den anden side kan argumentere for at man bevæger sig væk fra det der er skønt ved JavaScript, nemlig at man ikke skal have IDE'er, compileres, debugger installeret.

Og ideen om at man kompilere fra TypeScript til Javascript er for mig heller ikke specielt tiltalende. Jeg føler dog at jeg bør nævne, at der i forbindelse kompile processen, kan skabes en mapping fil, der gør at man debugger sine `.ts` filer og ikke sine kompileret `.js` filer. Det er en stor hjælp.

Samlet set må konklusionen være at man bør kaste sig over TypeScript. Det er en kæmpe hjælpe at få kompileringsfejl og IDE hjælp, og endnu mere når opgaven bliver større end denne lille case med legepladser.

## Source kode

Source koden kan hentes på [github](https://github.com/bregnvig/playgrounds)

Repositoriet består af tre implementationer af den samme case.
  
* angular-with-scope
* angular-controller-as
* angular-typescript
