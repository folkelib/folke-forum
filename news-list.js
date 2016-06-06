define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication', '../folke-ko-infinite-scroll/infinite-scroll'], function (require, exports, ko, services, authentication_1, infiniteScroll) {
    "use strict";
    var NewsListDataViewModel = (function () {
        function NewsListDataViewModel(parameters) {
            var _this = this;
            this.news = infiniteScroll.scrollableArray({ request: services.thread.getFromForum, parameters: { forumId: 10 } });
            this.forum = ko.observable();
            this.newNews = function () { return location.hash = '#news-edit'; };
            this.canEdit = ko.pureComputed(function () { return _this.forum() && authentication_1["default"].roleObservable(_this.forum().writeRole())(); });
            services.forum.getByName({ name: 'News' }).then(function (forum) {
                _this.forum(forum);
                _this.news.options.parameters.forumId = forum.id;
                _this.news.refresh();
            });
        }
        NewsListDataViewModel.prototype.close = function () {
            return false;
        };
        return NewsListDataViewModel;
    }());
    exports.NewsListDataViewModel = NewsListDataViewModel;
    exports.viewModel = NewsListDataViewModel;
});
