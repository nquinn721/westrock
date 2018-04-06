class Favorites{
	constructor(movies){
		this.movies = movies;
		this.currentFilter = {
			filterName: 'Now Playing',
			filter: 'now_playing'
		}

		this.movies.showOnlyFavorites();
	}

	filterFavs(filter, filterName){
		this.currentFilter = {filter, filterName};
		this.showFilters = false;
	}
}

app.controller('favorites', Favorites);