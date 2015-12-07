# playgrounds
This repository contains the same Playgrounds application implemented in different ways. Kinda like the [TodoMVC](http://todomvc.com/)

The playground application contains a list of Copenhagen playgrounds. The playgrounds will be sorted so that the closest ones are at the top of the list.

Selecting the playground will show the position on the map and a summary of this playground.

![Playgrounds screenshot](screenshot.png)



## angular-with-scope

The classic AngularJS application using the `$scope` in the controllers and directives.

## angular-controller-as

Using the newer and preferred `controllerAs` syntax instead of `$scope`

The directives uses the `bindToController`.

`$scope` will still be used for watching the model.

## angular-typescript

Using [TypeScript](http://www.typescriptlang.org/) to create the playground application.

Coming soon
