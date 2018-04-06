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