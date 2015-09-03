define(["knockout", "text!./home.html"], function(ko, template) {

	function viewModel(route) {
		var self = this;

		self.message = ko.observable('Welcome to the template!');
		self.doSomething = function() {
			self.message('You invoked doSomething() on the viewmodel.');
		}
	}

	return { viewModel: viewModel, template: template };

});
