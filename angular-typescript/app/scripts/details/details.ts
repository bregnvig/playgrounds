module playgrounds.feature.details {

  import IPlaygroundService = playgrounds.common.service.IPlaygroundService;
  'use strict';

  import ILocationResource = playgrounds.common.model.ILocationResource;
  import IRatingResource = playgrounds.common.model.IRatingResource;
  import ILocationResourceService = playgrounds.common.model.ILocationResourceService;
  import IRatingResourceService = playgrounds.common.model.IRatingResourceService;
  import IPlayground = playgrounds.common.model.IPlayground;

  export interface IDetailsScope {
    rating: ILocationResource;
    ratings: angular.resource.IResourceArray<IRatingResource>;
    playground: IPlayground;
    createRating(): void;
  }

  class RatingForm {
    public rating: number;
    public comment: string;
  }

  class DetailsController implements IDetailsScope {

    public rating: playgrounds.common.model.ILocationResource;
    public ratings: angular.resource.IResourceArray<IRatingResource>;
    public playground: IPlayground;

    public static $inject = ['$routeParams', 'playgroundService', 'Playground', 'Rating'];

    private model: RatingForm = new RatingForm();
    private review: angular.IFormController;

    constructor(private $routeParams: angular.route.IRouteParamsService, playgroundService: IPlaygroundService, Playground: ILocationResourceService, private Rating: IRatingResourceService) {
      playgroundService.find(this.getId()).then((playground) => {
        this.playground = playground;
      });
      this.rating = Playground.get({id: this.getId()});
      this.ratings = this.Rating.query({id: this.getId()});
    }

    public createRating(): void {
      new this.Rating(this.model).$save({id: this.getId()}, () => {
        this.ratings = this.Rating.query({id: this.getId()});
        this.model = new RatingForm();
        this.review.$setUntouched();
      });
    }

    private getId(): string {
      return this.$routeParams['id'];
    }

  }

  angular.module('playgrounds')
    .controller('DetailsCtrl', DetailsController);

}
