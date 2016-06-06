define(["require", "exports", 'knockout', 'services/services'], function (require, exports, ko, services) {
    "use strict";
    var PollListViewModel = (function () {
        function PollListViewModel() {
            var _this = this;
            this.polls = ko.observableArray([]);
            this.removePoll = function (poll) {
                services.poll.delete({ id: poll.id }).then(function () { return _this.polls.remove(poll); });
            };
            services.poll.get({}).then(function (pollDtos) { return _this.polls(pollDtos); });
        }
        return PollListViewModel;
    }());
    exports.PollListViewModel = PollListViewModel;
    exports.viewModel = PollListViewModel;
});
