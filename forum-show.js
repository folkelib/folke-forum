define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var ForumShowViewModel = (function () {
        function ForumShowViewModel(parameters) {
            var _this = this;
            this.forum = ko.observable();
            this.canEdit = ko.pureComputed(function () { return _this.forum() && authentication_1["default"].roleObservable('Administrator'); });
            this.editForum = function () { return location.hash = "forum/" + _this.forum().id + "/edit"; };
            services.forum.get({ id: parameters.id }).then(function (forum) { return _this.forum(forum); });
        }
        return ForumShowViewModel;
    }());
    exports.ForumShowViewModel = ForumShowViewModel;
    exports.viewModel = ForumShowViewModel;
});
