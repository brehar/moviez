'use strict';

var app = angular.module('moviesApp');

app.service('TopMovies', function($http) {
    this.getTopMovies = () => {
        return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=ad5195ef9835a6b08a8c2f061761bcd3');
    };

    this.getMovie = id => {
        return $http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ad5195ef9835a6b08a8c2f061761bcd3`);
    };
});

app.service('SeenMovies', function($http) {
    this.getMovieByImdbId = imdbId => {
        return $http.get(`/api/movies/imdbId/${imdbId}`);
    };

    this.getSeenMovies = () => {
        return $http.get('/api/movies/seen');
    };

    this.getFavoriteMovies = () => {
        return $http.get('/api/movies/favorites');
    };

    this.saveSeenMovie = movie => {
        return $http.post('/api/movies', movie);
    };

    this.removeMovieByImdbId = imdbId => {
        return $http.delete(`/api/movies/imdbId/${imdbId}`);
    };

    this.updateFavoriteByImdbId = (imdbId, newMovie) => {
        return $http.put(`/api/movies/imdbId/${imdbId}/favorite`, newMovie);
    };

    this.updateRatingByImdbId = (imdbId, newMovie) => {
        return $http.put(`/api/movies/imdbId/${imdbId}/rating`, newMovie);
    };
});

app.service('Search', function($http) {
    this.setSearchTerms = function(searchTerms) {
        this.searchTerms = searchTerms;
    };

    this.getSearchTerms = function() {
        return this.searchTerms;
    };
    
    this.searchMovieTitles = function(searchTerms) {
        return $http.get(`https://www.omdbapi.com/?s=${searchTerms}&type=movie`);
    };
    
    this.getMovie = imdbId => {
        return $http.get(`https://www.omdbapi.com/?i=${imdbId}`);
    };
});