define(["knockout", "text!./nav-bar.html", "jquery"], function(ko, template, $) {

	function NavBarViewModel(params) {
		var self = this;

		// route, used to make the CSS active for the selected item
		self.route = params.route;

		// some example fields to use in the nav bar
		self.userName = ko.observable('Some User');
		self.hasAdminPrivs = ko.observable(true);

		// make the dropdown work for now :)
		$('.ui.menu .ui.dropdown').dropdown({
			on: 'hover'
		});

	}

	return { viewModel: NavBarViewModel, template: template };
});
