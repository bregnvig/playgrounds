module playgrounds.common.model {

  'use strict';

  export interface ILocationResource extends angular.resource.IResource<ILocationResource> {
    identifier: string;
    averageRating: number;
    lat: number;
    lng: number;
  }

  export interface ILocationResourceService extends angular.resource.IResourceClass<ILocationResource> {

  }

  export interface IRatingResource extends angular.resource.IResource<IRatingResource> {
    identifier?: string;
    rating: number;
    comment: string;
  }

  export interface IRatingResourceService extends angular.resource.IResourceClass<IRatingResource> {

  }

  angular.module('playgrounds')
    .factory('Playground', ['$resource', ($resource: angular.resource.IResourceService): ILocationResourceService => {
      return <ILocationResourceService> $resource('https://ratr-2015.appspot.com/location/:id');
    }])
    .factory('Rating', ['$resource', ($resource: angular.resource.IResourceService): IRatingResourceService => {
      return <IRatingResourceService> $resource('https://ratr-2015.appspot.com/location/:id/rating');
    }]);
}

