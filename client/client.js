var app = angular.module('movieApp', []);

var imageLoaded = false;

app.directive('imageonload', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
            element.bind('load', function() {
                // alert('image is loaded');
                imageLoaded = true;
                console.log('image loaded');
            });
        }
  };
});

app.controller('MovieController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.inputMovie = {};

  $scope.getMovieInfo = function(){
    // console.log($scope.movie);
    $scope.showLoader = true;
    $scope.showImage = false;
    $scope.movieUrl = 'http://omdbapi.com/?t=' + $scope.inputMovie.title + '&y=' + $scope.inputMovie.year + '&plot=short&r=json';

    $http.get($scope.movieUrl).then(function(response){
      $scope.newMovie = {};
      $scope.newMovie = response.data;
      // console.log($scope.newMovie);
      $scope.waitForLoad();
      response = '';
      $scope.movie = {};
    });
  };

  $scope.waitForLoad = function(){
    var waiting = $interval(function(){
      if(imageLoaded){
        $scope.showLoader = false;
        $scope.showImage = true;
        imageLoaded = false;
        return;
      }
    }, 100);
  }

  $scope.saveMovie = function(){
    console.log('POST newMovie', $scope.newMovie);
    // check if movie is available via Netflix
    var netflixUrl = 'http://netflixroulette.net/api/api.php?title=' + $scope.newMovie.Title;

    $http.get(netflixUrl).then(function(response){
      console.log('Netflix response:', response);
      if(response.status == 200){
        // console.log('netflix available made true');
        $scope.newMovie.netflixAvailable = true;
        // console.log($scope.newMovie);
      }
      var netflixed = $scope.newMovie;
      console.log('$scope.newMovie.netflixAvailable', $scope.newMovie.netflixAvailable)
      console.log('netflixed:', netflixed);
      $http.post('/save', netflixed).then(function(response){
        if(response.status !== 200){
          // console.log('Error');
        } else {
          // console.log(response);
          // console.log('Movie saved');
        }
        $scope.getMovieCollection();
      });
    }, function (response){
      console.log('netflix available made false');
      $scope.newMovie.netflixAvailable = false;
      $http.post('/save', $scope.newMovie).then(function(response){
        if(response.status !== 200){
          // console.log('Error');
        } else {
          // console.log(response);
          // console.log('Movie saved');
        }
        $scope.getMovieCollection();
      });
    });
  };

  $scope.getMovieCollection = function(){
    return $http.get('/movies').then(function(response){
      if(response.status !== 200){
        throw new Error('Failed to get movies');
      }
      // console.log('collected movies');
      $scope.movies = response.data;
      return $scope.movies;
    });
  };

  $scope.getMovieCollection();
}]);
