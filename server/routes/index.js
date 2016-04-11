var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/running_skeleton');

var Movie = mongoose.model('Movie', {title:String, year:Number, netflixAvailable:Boolean, poster:String, plot:String});

router.get('/', function(req, res){
  // res.send('Router is routing');
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
  // console.log('GET request \'/\' received');
});

router.post('/save', function(req, res){
  // check if movie already exists in database
  Movie.find({title: req.body.Title}).exec(function(err, movies){
    // console.log('movies already in database:', movies);
    if(movies == false){
      // console.log('post request:', req.body);
      var newMovie = new Movie({title: req.body.Title, year: req.body.Year, poster: req.body.Poster, plot: req.body.Plot, netflixAvailable: req.body.netflixAvailable});
      console.log('Saving movie: ', newMovie);
      newMovie.save(function(){
        res.send(newMovie.toJSON());
      });
    } else {
      console.log('This movie has already been saved.');
    }
  });
});

router.get('/movies', function(req, res){
  return Movie.find({}).exec(function(err, movies){
    res.send(JSON.stringify(movies));
  });
});

module.exports = router;
