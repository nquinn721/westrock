app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/home',
        controller: 'home',
        controllerAs: 'home'
    })
    .when('/favorites', {
        templateUrl: '/favorites',
        controller: 'favorites',
        controllerAs: 'favorites'
    });
});