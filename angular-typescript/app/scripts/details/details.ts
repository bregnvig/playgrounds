module playgrounds.feature.details {

  import IPlaygroundService = playgrounds.common.service.IPlaygroundService;
  'use strict';

  import ILocationResource = playgrounds.common.model.ILocationResource;
  import IRatingResource = playgrounds.common.model.IRatingResource;
  import ILocationResourceService = playgrounds.common.model.ILocationResourceService;
  import IRatingResourceService = playgrounds.common.model.IRatingResourceService;
  import IPlayground = playgrounds.common.model.IPlayground;

  export interface IDetailsScope {
    rating:ILocationResource;
    ratings:angular.resource.IResourceArray<IRatingResource>;
    playground:IPlayground;
    createRating():void;
  }

  class RatingForm {
    rating:number;
    comment:string;
  }

  class DetailsController implements IDetailsScope {

    rating:playgrounds.common.model.ILocationResource;
    ratings:angular.resource.IResourceArray<IRatingResource>;
    playground:IPlayground;
    private model:RatingForm = new RatingForm();
    private review:angular.IFormController;

    static $inject = ['$routeParams', 'playgroundService', 'Playground', 'Rating'];

    constructor(private $routeParams:angular.route.IRouteParamsService, playgroundService:IPlaygroundService, Playground:ILocationResourceService, private Rating:IRatingResourceService) {
      playgroundService.find(this.getId()).then((playground) => {
        console.log('Playground', playground);
        this.playground = playground;
      });
      this.rating = Playground.get({ id: this.getId() });
      this.ratings = this.Rating.query({ id: this.getId() });
    }

    private getId():string {
      return this.$routeParams['id'];
    }

    createRating():void {
      new this.Rating(this.model).$save({ id: this.getId() }, () => {
        this.ratings = this.Rating.query({ id: this.getId() });
        this.model = new RatingForm();
        this.review.$setUntouched();
      });
    }
  }

  angular.module('playgrounds')
    .controller('DetailsCtrl', DetailsController);

}
