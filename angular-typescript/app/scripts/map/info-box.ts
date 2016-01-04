module playgrounds.feature.map {

  'use strict';

  import IPlayground = playgrounds.common.model.IPlayground;
  import ILocationResource = playgrounds.common.model.ILocationResource;
  import ILocationResourceService = playgrounds.common.model.ILocationResourceService;

  interface IInfoBoxController {
    playground: IPlayground;
    showDetails(): void;
  }

  class InfoBoxController implements IInfoBoxController {
    public static $inject = ['$scope', '$location', 'Playground'];

    public playground: IPlayground;
    public rating: ILocationResource;

    constructor($scope: angular.IScope, private $location: angular.ILocationService, Playground: ILocationResourceService) {
      $scope.$watch(() => {
        return this.playground;
      }, (playground) => {
        if (playground) {
          this.rating = Playground.get({'id': playground.id});
          this.rating.$promise.catch((response) => {
            if (response.status === 404) {
              this.rating = new Playground();
              this.rating.identifier = playground.id;
              this.rating.lat = playground.position.lat;
              this.rating.lng = playground.position.lng;
              this.rating.$save();
            }
          });
        }
      });
    }

    public showDetails(): void {
      this.$location.path('/details/' + this.playground.id);
    }
  }

  class InfoBox implements angular.IDirective {
    public restrict = 'E';
    public scope = {};
    public bindToController = {
      playground: '='
    };
    public controllerAs = 'vm';
    public controller = InfoBoxController;
    public templateUrl = 'scripts/map/info-box.tmpl.html';

    public static factory() {
      const directive = () => {
        return new InfoBox();
      };
      directive.$inject = [];

      return directive;
    }
  }

  angular.module('playgrounds')
    .directive('playgroundInfoBox', InfoBox.factory());

}
