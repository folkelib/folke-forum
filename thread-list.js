define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication', '../folke-ko-infinite-scroll/infinite-scroll'], function (require, exports, ko, services, authentication_1, infiniteScroll) {
    "use strict";
    var ThreadListViewModel = (function () {
        function ThreadListViewModel(parameters) {
            var _this = this;
            this.threads = infiniteScroll.scrollableArray({ request: services.thread.getFromForum, parameters: { forumId: 10 } });
            this.newThread = function () { return location.hash = 'forum/' + _this.forum.id + '/threads/add'; };
            this.isNew = function (thread) { return thread.lastViewedId() === 0 && authentication_1["default"].logged(); };
            this.getUrl = function (thread) { return ("#thread/" + thread.id); };
            this.forum = ko.unwrap(parameters.forum);
            if (this.forum) {
                this.threads.options.parameters.forumId = this.forum.id;
                if (this.threads.options.parameters.forumId) {
                    this.threads.refresh();
                }
                this.canWrite = this.forum.writeRole() ? authentication_1["default"].roleObservable(this.forum.writeRole()) : ko.observable(true);
            }
        }
        return ThreadListViewModel;
    }());
    exports.ThreadListViewModel = ThreadListViewModel;
    exports.viewModel = ThreadListViewModel;
});
