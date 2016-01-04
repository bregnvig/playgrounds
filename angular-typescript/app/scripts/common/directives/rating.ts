module playgrounds.common.directives {

  'use strict';

  class Rating implements angular.IDirective {
    public restrict = 'E';
    public templateUrl = 'scripts/common/directives/rating.tmpl.html';
    public scope = {};
    public bindToController = {
      message: '=',
      rating: '='
    };
    public controllerAs = 'vm';
    public controller = () => { };

    public static factory() {
      const directive = () => {
        return new Rating();
      };
      directive.$inject = [];
      return directive;
    }

  }

  angular.module('playgrounds')
    .directive('rating', Rating.factory());

}
