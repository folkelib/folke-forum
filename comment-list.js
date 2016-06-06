define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication) {
    "use strict";
    var CommentListViewModel = (function () {
        function CommentListViewModel(parameters) {
            var _this = this;
            this.newComment = new services.CommentView({ text: "" });
            this.comments = ko.observableArray();
            this.addComment = function () {
                services.thread.postComment({ threadId: _this.threadId, value: _this.newComment }).then(function (commentDto) {
                    _this.newComment.text("");
                    _this.comments.unshift(commentDto);
                });
            };
            this.canComment = authentication.default.logged;
            this.threadId = ko.unwrap(parameters.threadId);
            services.thread.getComments({ threadId: this.threadId }).then(function (comments) { return _this.comments(comments); });
        }
        return CommentListViewModel;
    }());
    exports.CommentListViewModel = CommentListViewModel;
    exports.viewModel = CommentListViewModel;
});
