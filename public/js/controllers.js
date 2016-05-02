'use strict';

var app = angular.module('moviesApp');

app.controller('mainCtrl', function($scope, $state, Search) {
    $scope.onFormSubmit = function() {
        Search.setSearchTerms($scope.searchText);
        $scope.searchText = '';
        $state.go('search', {}, {reload: true});
    };
});

app.controller('homeCtrl', function($scope, TopMovies) {
    TopMovies.getTopMovies().then(res => {
        $scope.topMovies = res.data.results;
    });
});

app.controller('topdetailsCtrl', function($scope, $state, TopMovies, SeenMovies) {
    TopMovies.getMovie($state.params.id).then(res => {
        $scope.topMovie = res.data;
        $scope.title = res.data.original_title;
        $scope.poster = 'https://image.tmdb.org/t/p/w300' + res.data.poster_path;
        $scope.genres = res.data.genres;
        $scope.imdbId = res.data.imdb_id;

        return SeenMovies.getMovieByImdbId($scope.imdbId);
    }).then(res => {
        if (!res.data[0].seen || res.data[0].seen === 0) {
            $scope.seen = false;
        } else {
            $scope.seen = true;
        }

        if (!res.data[0].favorite || res.data[0].favorite === 0) {
            $scope.favorite = false;
        } else {
            $scope.favorite = true;
        }

        $scope.rating = res.data[0].rating;
    });

    $scope.saveSeenMovie = function() {
        var movie = {
            imdbId: $scope.imdbId,
            name: $scope.title,
            posterUrl: $scope.poster,
            seen: 1
        };

        SeenMovies.saveSeenMovie(movie).then(res => {
            $scope.seen = true;
        });
    };

    $scope.removeMovie = function() {
        SeenMovies.removeMovieByImdbId($scope.imdbId).then(res => {
            $scope.seen = false;
        });
    };

    $scope.toggleFavorite = function() {
        if (!$scope.favorite || $scope.favorite === false) {
            var movie = {
                favorite: 1
            };
        } else {
            movie = {
                favorite: 0
            };
        }

        SeenMovies.updateFavoriteByImdbId($scope.imdbId, movie).then(res => {
            if (!$scope.favorite || $scope.favorite === false) {
                $scope.favorite = true;
            } else {
                $scope.favorite = false;
            }
        });
    };

    $scope.updateRating = function() {
        var movie = {
            rating: $scope.rating
        };

        SeenMovies.updateRatingByImdbId($scope.imdbId, movie).then(res => {
            
        });
    };
});

app.controller('seenCtrl', function($scope, SeenMovies) {
    SeenMovies.getSeenMovies().then(res => {
        $scope.seenMovies = res.data;
    });
});

app.controller('favoritesCtrl', function($scope, SeenMovies) {
    SeenMovies.getFavoriteMovies().then(res => {
        $scope.favoriteMovies = res.data;
    });
});

app.controller('searchCtrl', function($scope, Search) {
    var searchTerms = Search.getSearchTerms();

    Search.searchMovieTitles(searchTerms).then(res => {
        $scope.searchResults = res.data.Search;
    });
});

app.controller('searchdetailsCtrl', function($scope, $state, Search, SeenMovies) {
    Search.getMovie($state.params.id).then(res => {
        $scope.movie = res.data;
        $scope.imdbId = res.data.imdbID;
        $scope.title = res.data.Title;
        $scope.poster = res.data.Poster;

        return SeenMovies.getMovieByImdbId($scope.imdbId);
    }).then(res => {
        if (!res.data[0].seen || res.data[0].seen === 0) {
            $scope.seen = false;
        } else {
            $scope.seen = true;
        }

        if (!res.data[0].favorite || res.data[0].favorite === 0) {
            $scope.favorite = false;
        } else {
            $scope.favorite = true;
        }

        $scope.rating = res.data[0].rating;
    });

    $scope.saveSeenMovie = function() {
        var movie = {
            imdbId: $scope.imdbId,
            name: $scope.title,
            posterUrl: $scope.poster,
            seen: 1
        };

        SeenMovies.saveSeenMovie(movie).then(res => {
            $scope.seen = true;
        });
    };

    $scope.removeMovie = function() {
        SeenMovies.removeMovieByImdbId($scope.imdbId).then(res => {
            $scope.seen = false;
        });
    };

    $scope.toggleFavorite = function() {
        if (!$scope.favorite || $scope.favorite === false) {
            var movie = {
                favorite: 1
            };
        } else {
            movie = {
                favorite: 0
            };
        }

        SeenMovies.updateFavoriteByImdbId($scope.imdbId, movie).then(res => {
            if (!$scope.favorite || $scope.favorite === false) {
                $scope.favorite = true;
            } else {
                $scope.favorite = false;
            }
        });
    };

    $scope.updateRating = function() {
        var movie = {
            rating: $scope.rating
        };

        SeenMovies.updateRatingByImdbId($scope.imdbId, movie).then(res => {

        });
    };
});