var app = angular.module('movieApp', []);

app.controller('MovieController', ['$scope', '$http', function($scope, $http){
  $scope.inputMovie = {};

  $scope.getMovieInfo = function(){
    // console.log($scope.movie);
    $scope.movieUrl = 'http://omdbapi.com/?t=' + $scope.inputMovie.title + '&y=' + $scope.inputMovie.year + '&plot=full&r=json';

    $http.get($scope.movieUrl).then(function(response){
      $scope.newMovie = {};
      $scope.newMovie = response.data;
      console.log($scope.newMovie);
      $scope.movie = {};
    });
  };

  $scope.saveMovie = function(){
    console.log('POST newMovie', $scope.newMovie);
    $http.post('/save', $scope.newMovie).then(function(response){
      if(response.status !== 200){
        console.log('Error');
      } else {
        console.log(response);
        console.log('Movie saved');
      }
    });
    $scope.getMovieCollection();
  };

  $scope.getMovieCollection = function(){
    return $http.get('/movies').then(function(response){
      if(response.status !== 200){
        throw new Error('Failed to get movies');
      }
      $scope.movies = response.data;
      return $scope.movies;
    });
  };

  $scope.getMovieCollection();
}]);
