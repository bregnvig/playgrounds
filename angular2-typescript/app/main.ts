import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy, ROUTER_PROVIDERS} from "angular2/router";
import {provide} from "angular2/core";

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
