angular.module('playgrounds')
  .directive('playgroundInfoBox', function() {
    return {
      restrict: 'E',
      templateUrl: 'info-box.html',
      scope: {
        playground: '='
      },
      controller: function($scope, $location, $routeParams, Playground) {
        $scope.showDetails = function(playground) {
          $location.path('/details/' + playground.id);
        };
        $scope.rating = Playground.get({ 'id': $routeParams.id });
        $scope.rating.$promise.catch(function(response) {
          if (response.status === 404) {
            $scope.rating.identifier = $scope.playground.id;
            $scope.rating.lng = $scope.playground.position.longitude;
            $scope.rating.lat = $scope.playground.position.latitude;
            $scope.rating.$save();
          }
        });
      }
    };
  })
  .directive('myRating', function() {
    return {
      restrict: 'E',
      templateUrl: 'my-rating.html',
      scope: {
        rating: '=',
        readOnly: '='
      },
      link: function($scope, $element) {
        $scope.$watch('rating', function() {
          var ies = $element.children('i');
          for (var i = 0; i < 5; i++) {
            var star = angular.element(ies[i]);
            star.removeClass('fa-star fa-star-o fa-star-half-o');
            if ($scope.rating - (i + 1) >= 0) {
              star.addClass('fa-star');
            } else if ($scope.rating - (i + 1) >= -0.5) {
              star.addClass('fa-star-half-o');
            } else {
              star.addClass('fa-star-o');
            }
          }
        });
      },
      controller: function($scope) {
        $scope.change = function(value) {
          if (!$scope.readOnly) {
            $scope.rating = value;
          }
        };
      }
    };
  })
  .directive('rating', function() {
    return {
      restrict: 'E',
      templateUrl: 'rating.html',
      scope: {
        message: '=',
        rating: '='
      }
    };
  });
