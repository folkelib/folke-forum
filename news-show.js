define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var NewsShowViewModel = (function () {
        function NewsShowViewModel(parameters) {
            var _this = this;
            this.news = ko.observable();
            this.loadComments = function () {
                _this.commentShown(true);
            };
            this.canEdit = ko.pureComputed(function () { return _this.news() && (authentication_1["default"].roleObservable('Administrator') || authentication_1["default"].account().id == _this.news().author().id); });
            this.commentShown = ko.observable(false);
            this.link = ko.pureComputed(function () { return _this.news() ? "#news/" + _this.news().id : ''; });
            this.editNews = function () { return location.hash = '#news-edit/' + _this.news().id; };
            if (parameters.news) {
                this.news(ko.unwrap(parameters.news));
            }
            else {
                services.thread.get({ id: parameters.id }).then(function (news) { return _this.news(news); });
                this.commentShown(true);
            }
        }
        return NewsShowViewModel;
    }());
    exports.NewsShowViewModel = NewsShowViewModel;
    exports.viewModel = NewsShowViewModel;
});
