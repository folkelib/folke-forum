define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var ThreadShowViewModel = (function () {
        function ThreadShowViewModel(parameters) {
            var _this = this;
            this.thread = ko.observable();
            this.canEdit = ko.pureComputed(function () { return _this.thread() && (authentication_1["default"].roleObservable('Administrator') || authentication_1["default"].account().id === _this.thread().author().id); });
            this.commentShown = ko.observable(false);
            this.link = ko.pureComputed(function () { return _this.thread() ? "#news/" + _this.thread().id : ''; });
            this.editThread = function () { return location.hash = "thread/" + _this.thread().id + "/edit"; };
            if (parameters.thread) {
                this.thread(ko.unwrap(parameters.thread));
            }
            else {
                services.thread.get({ id: parameters.id }).then(function (thread) {
                    _this.thread(thread);
                });
            }
        }
        return ThreadShowViewModel;
    }());
    exports.ThreadShowViewModel = ThreadShowViewModel;
    exports.viewModel = ThreadShowViewModel;
});
