define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var CommentViewModel = (function () {
        function CommentViewModel(parameters) {
            var _this = this;
            this.comment = ko.observable();
            this.editMode = ko.observable(false);
            this.editComment = function () {
                _this.editMode(true);
            };
            this.canEdit = ko.pureComputed(function () {
                return _this.comment().author() && _this.comment().author().id == authentication_1["default"].account().id;
            });
            this.saveComment = function () {
                _this.editMode(false);
                services.comment.put({ id: _this.comment().id, value: _this.comment() });
            };
            if (parameters.id) {
                services.comment.get({ id: parameters.id }).then(function (comment) { return _this.comment(comment); });
            }
            else {
                this.comment(ko.unwrap(parameters.comment));
            }
        }
        return CommentViewModel;
    }());
    exports.CommentViewModel = CommentViewModel;
    exports.viewModel = CommentViewModel;
});
