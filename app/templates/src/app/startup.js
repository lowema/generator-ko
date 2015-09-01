define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

	// Components are packaged as AMD modules:
	ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });

	// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

	// Static pages are also packaged as AMD modules:
	ko.components.register('about-page', {
		template: { require: 'text!pages/about.html' }
	});
	// And also ViewModel capable pages
	ko.components.register('home-page', { require: 'pages/home' });

	// [Scaffolded page registrations will be inserted here. To retain this feature, don't remove this comment.]

	// Start the application once the DOM is ready
	$(document).ready(function() {

		ko.applyBindings({ route: router.currentRoute });

	});

});
