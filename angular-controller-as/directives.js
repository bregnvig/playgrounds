angular.module('playgrounds')
  .directive('playgroundInfoBox', function() {
    return {
      restrict: 'E',
      templateUrl: 'info-box.html',
      bindToController: {
        playground: '='
      },
      scope: {},
      controllerAs: 'vm',
      controller: function($scope, $location, Playground) {
        var vm = this;
        vm.showDetails = function() {
          $location.path('/details/' + vm.playground.id);
        };
        $scope.$watch(function() {
          return vm.playground;
        }, function(playground) {
          if (playground) {
            vm.rating = Playground.get({ 'id': playground.id });
            vm.rating.$promise.catch(function(response) {
              if (response.status === 404) {
                vm.rating.identifier = playground.id;
                vm.rating.lat = playground.position.lat;
                vm.rating.lng = playground.position.lng;
                vm.rating.$save();
              }
            });
          }
        })
      }
    };
  })
  .directive('myRating', function() {
    return {
      restrict: 'E',
      templateUrl: 'my-rating.html',
      bindToController: {
        rating: '=',
        readOnly: '='
      },
      scope: {},
      link: function(scope, element, attributes, vm) {
        scope.$watch(function() {
          return vm.rating;
        }, function() {
          var ies = element.children('i');
          for (var i = 0; i < 5; i++) {
            var star = angular.element(ies[i]);
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
      },
      controllerAs: 'vm',
      controller: function() {
        var vm = this;
        vm.change = function(value) {
          if (!vm.readOnly) {
            vm.rating = value;
          }
        };
      }
    };
  })
  .directive('rating', function() {
    return {
      restrict: 'E',
      templateUrl: 'rating.html',
      bindToController: {
        message: '=',
        rating: '='
      },
      scope: {},
      controllerAs: 'vm',
      controller: function() {
      }
    }
  });
