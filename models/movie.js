'use strict';

var db = require('../config/db');

exports.getMovies = function(cb) {
    db.query('SELECT * FROM movies', cb);
};

exports.getMovieById = function(id, cb) {
    db.query(`SELECT * FROM movies WHERE id = ${id}`, cb);
};

exports.getMovieByImdbId = function(imdbId, cb) {
    db.query(`SELECT * FROM movies WHERE imdbId = '${imdbId}'`, cb);
};

exports.getSeenMovies = function(cb) {
    db.query('SELECT * FROM movies WHERE seen = 1', cb);
};

exports.getFavoriteMovies = function(cb) {
    db.query('SELECT * FROM movies WHERE favorite = 1', cb);
};

exports.createMovie = function(movie, cb) {
    if (!movie.imdbId || !movie.name || !movie.posterUrl || !movie.seen) {
        return cb('Missing required field(s).');
    }

    db.query(`INSERT INTO movies (imdbId, name, posterUrl, seen) VALUES ('${movie.imdbId}', '${movie.name}', '${movie.posterUrl}', '${movie.seen}')`, err => {
        if (err) return cb(err);

        db.query('SELECT * FROM movies WHERE id = (SELECT MAX(id) FROM movies)', cb);
    });
};

exports.removeMovieById = function(id, cb) {
    if (!id) return cb('Movie id required.');

    db.query(`DELETE FROM movies WHERE id = ${id}`, function(err) {
        cb(err);
    });
};

exports.removeMovieByImdbId = function(imdbId, cb) {
    if (!imdbId) return cb('IMDB id required.');

    db.query(`DELETE FROM movies WHERE imdbId = '${imdbId}'`, function(err) {
        cb(err);
    });
};

exports.updateMovieById = function(id, newMovie, cb) {
    if (!id) return cb('Movie id required.');

    if (!newMovie.imdbId || !newMovie.name || !newMovie.posterUrl || !newMovie.seen) {
        return cb('Missing required field(s).');
    }

    db.query(`UPDATE movies SET imdbId = '${newMovie.imdbId}', name = '${newMovie.name}', posterUrl = '${newMovie.posterUrl}', favorite = '${newMovie.favorite}', seen = '${newMovie.seen}', rating = '${newMovie.rating}' WHERE id = ${id}`, cb);
};

exports.updateFavoriteByImdbId = function(imdbId, newMovie, cb) {
    if (!imdbId) return cb('IMDB id required.');

    db.query(`UPDATE movies SET favorite = '${newMovie.favorite}' WHERE imdbId = '${imdbId}'`, cb);
};

exports.updateRatingByImdbId = function(imdbId, newMovie, cb) {
    if (!imdbId) return cb('IMDB id required.');

    db.query(`UPDATE movies SET rating = '${newMovie.rating}' WHERE imdbId = '${imdbId}'`, cb);
};