'use strict';

var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

router.route('/').get((req, res) => {
    Movie.getMovies((err, movies) => {
        if (err) return res.status(400).send(err);
        
        res.send(movies);
    });
}).post((req, res) => {
    Movie.createMovie(req.body, (err, newMovie) => {
        if (err) return res.status(400).send(err);
        
        res.send(newMovie);
    });
});

router.route('/imdbId/:id').get((req, res) => {
    var imdbId = req.params.id;

    Movie.getMovieByImdbId(imdbId, (err, movie) => {
        if (err || !movie) {
            return res.status(400).send(err);
        }

        res.send(movie);
    });
}).delete((req, res) => {
    var imdbId = req.params.id;

    Movie.removeMovieByImdbId(imdbId, err => {
        if (err) return res.status(400).send(err);

        res.send();
    });
});

router.get('/seen', (req, res) => {
    Movie.getSeenMovies((err, movies) => {
        if (err) return res.status(400).send(err);

        res.send(movies);
    });
});

router.get('/favorites', (req, res) => {
    Movie.getFavoriteMovies((err, movies) => {
        if (err) return res.status(400).send(err);

        res.send(movies);
    });
});

router.put('/imdbId/:id/favorite', (req, res) => {
    var imdbId = req.params.id;

    Movie.updateFavoriteByImdbId(imdbId, req.body, err => {
        if (err) return res.status(400).send(err);

        res.send();
    });
});

router.put('/imdbId/:id/rating', (req, res) => {
    var imdbId = req.params.id;

    Movie.updateRatingByImdbId(imdbId, req.body, err => {
        if (err) return res.status(400).send(err);

        res.send();
    });
});

router.route('/:id').get((req, res) => {
    var id = req.params.id;
    
    Movie.getMovieById(id, (err, movie) => {
        if (err || !movie) {
            return res.status(400).send(err || 'Movie not found.');
        }
        
        res.send(movie);
    });
}).put((req, res) => {
    var id = req.params.id;
    
    Movie.updateMovieById(id, req.body, err => {
        if (err) return res.status(400).send(err);
        
        res.send();
    });
}).delete((req, res) => {
    var id = req.params.id;
    
    Movie.removeMovieById(id, err => {
        if (err) return res.status(400).send(err);
        
        res.send();
    });
});

module.exports = router;