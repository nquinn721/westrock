class Header{
	constructor($location) {
		this.activeRoute = $location.$$url.substr(1) || 'home';
		
	}

}


app.controller('header', Header);