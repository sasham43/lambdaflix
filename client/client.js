var app = angular.module('movieApp', []);

app.controller('MovieController', ['$scope', '$http', function($scope, $http){
  $scope.inputMovie = {};

  $scope.getMovieInfo = function(){
    // console.log($scope.movie);
    $scope.movieUrl = 'http://omdbapi.com/?t=' + $scope.inputMovie.title + '&y=' + $scope.inputMovie.year + '&plot=short&r=json';

    $http.get($scope.movieUrl).then(function(response){
      $scope.newMovie = {};
      $scope.newMovie = response.data;
      // console.log($scope.newMovie);
      response = '';
      $scope.movie = {};
    });
  };

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
