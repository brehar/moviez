'use strict';

var app = angular.module('moviesApp', ['ui.router', 'ngLoadingSpinner']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl',
        cache: true
    }).state('topdetails', {
        url: '/topdetails/:id',
        templateUrl: '/html/topdetails.html',
        controller: 'topdetailsCtrl',
        cache: true
    }).state('seen', {
        url: '/seen',
        templateUrl: '/html/seen.html',
        controller: 'seenCtrl',
        cache: true
    }).state('search', {
        url: '/search',
        templateUrl: '/html/search.html',
        controller: 'searchCtrl',
        cache: true
    }).state('searchdetails', {
        url: '/searchdetails/:id',
        templateUrl: '/html/searchdetails.html',
        controller: 'searchdetailsCtrl',
        cache: true
    }).state('favorites', {
        url: '/favorites',
        templateUrl: '/html/favorites.html',
        controller: 'favoritesCtrl',
        cache: true
    });

    $urlRouterProvider.otherwise('/');
});