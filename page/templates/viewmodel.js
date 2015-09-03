define(['knockout', 'text!./<%= fileName %>.html'], function(ko, template) {

	function <%= viewModelClassName %>(params) {
		var self = this;

		self.message = ko.observable('Hello from the <%= pageName %> page!');

		self.doSomething = function() {
			console.log('You did something in the view.');
			self.message('Something got done !');
		}
	}

	<%= viewModelClassName %>.prototype.dispose = function() {
		// This runs when the component is torn down. Put here any logic necessary to clean up,
		// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.

	};

	return { viewModel: <%= viewModelClassName %>, template: template };

});
