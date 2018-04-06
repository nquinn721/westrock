var app = angular.module('app', ['ngRoute']);
  
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
const apiKey = 'c8926c6972819f964744dd55e0ecf582';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
var http;
class Movies{
	constructor($http) {
		http = $http;
		this.favorites = this.getFavorites();
		
		if(!this.favorites){
			localStorage.setItem('favorites', '[]');
		}

	}

	showOnlyFavorites(){
		this.list = this.favorites;
	}

	search(list){
		http.get(`${baseUrl + list}?api_key=${apiKey}`).then((data) => {
			let favs = this.getFavorites();
			
			this.list = data.data.results;
			console.log(this.list);
			
			this.list.forEach((movie) => {
				favs.forEach((fav) => {
					if(fav.title === movie.title){
						movie.favorited = true;
					}
				})

				movie.starsFilled = [];
				movie.starsFilled.length = Math.round(Math.round(movie.vote_average) / 2);
				movie.starsNotFilled = [];
				movie.starsNotFilled.length = 5 - movie.starsFilled.length;
			});
		});
	}

	checkSaveFavorite(movie, filter){
		if(movie.favorited){
			this.removeFavorite(movie);
		}else{
			this.saveFavorite(movie, filter);
		}
	}

	saveFavorite(movie, filter){
		let favs = this.getFavorites();
		favs.push(movie);

		movie.favorited = true;
		movie.filter = filter;
		this.favorites = favs;

		localStorage.setItem('favorites', JSON.stringify(favs));
	}
	removeFavorite(movie){
		let favs = this.getFavorites();

		favs.forEach((fav, i) => {
			if(fav.title === movie.title){
				favs.splice(i, 1);
			}
		});
		
		movie.favorited = false;
		this.favorites = favs;

		localStorage.setItem('favorites', JSON.stringify(favs));
	}

	getFavorites(){
		return JSON.parse(localStorage.getItem('favorites'));
	}

}
app.factory('movies', Movies);
class Favorites{
	constructor(movies){
		this.movies = movies;
		this.currentFilter = {
			filterName: 'All',
			filter: 'all'
		}

		this.movies.showOnlyFavorites();
	}

	filterFavs(filter, filterName){
		this.currentFilter = {filter, filterName};
		this.showFilters = false;
	}
}

app.controller('favorites', Favorites);
class Header{
	constructor($location) {
		this.activeRoute = $location.$$url.substr(1) || 'home';
		
	}

}


app.controller('header', Header);
class Home{
	constructor(movies){
		this.movies = movies;
		this.currentFilter = {
			filterName: 'Now Playing',
			filter: 'now_playing'
		};

		this.movies.search('now_playing');
	}

	getMovies(filter, filterName){
		this.currentFilter = {filterName, filter};
		this.showFilters = false;
		this.movies.search(filter);
	}
}

app.controller('home', Home);