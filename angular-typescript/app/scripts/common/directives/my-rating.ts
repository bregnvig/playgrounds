module playgrounds.common.directives {

  'use strict';

  class MyRatingController {

    public readOnly: boolean;
    public rating: number;

    public change(value: number): void {
      if (!this.readOnly) {
        this.rating = value;
      }
    }
  }

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
      scope.$watch(() => {
        return vm.rating;
      }, () => {

        const ies = element.children('i');
        for (let i = 0; i < 5; i++) {
          const star = angular.element(ies[i]);

          star.removeClass('fa-star fa-star-o fa-star-half-o');
          if (vm.rating - (i + 1) >= 0) {
            star.addClass('fa-star');
          } else if (vm.rating - (i + 1) >= -0.5) {
            star.addClass('fa-star-half-o');
          } else {
            star.addClass('fa-star-o');
          }
        }
      });
    }

    public static factory() {
      const directive = (): angular.IDirective => {
        return new MyRating();
      };
      directive.$inject = [];
      return directive;
    }
  }

  angular.module('playgrounds')
    .directive('myRating', MyRating.factory());

}
