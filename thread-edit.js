define(["require", "exports", 'knockout', 'services/services', 'bower_components/folke-ko-imageupload/folke-ko-imageupload', '../folke-identity/authentication', '../folke-ko-wysiwyg/wysiwyg'], function (require, exports, ko, services, imageUpload, authentication_1, wysiwyg) {
    "use strict";
    var ViewModel = (function () {
        function ViewModel(params) {
            var _this = this;
            this.params = params;
            this.thread = ko.observable(new services.ThreadFullView());
            this.wysiwyg = new wysiwyg.CommandState();
            this.canSave = this.thread().isValid;
            this.imageUploadOptions = new imageUpload.Options("/api/image", function (data) {
                if (!_this.thread().photos())
                    _this.thread().photos([]);
                _this.thread().photos.push(new services.PhotoView(data));
            });
            this.saveThread = function () {
                if (_this.thread().id) {
                    services.thread.put({ id: _this.thread().id, value: _this.thread() }).then(function () { return window.location.hash = "news/" + _this.thread().id; });
                }
                else {
                    services.thread.post({ forumId: _this.params.forumId, value: _this.thread() }).then(function (news) { return window.location.hash = "news/" + news.id; });
                }
            };
            this.goBack = function () { return location.hash = '#news'; };
            this.completeTag = function (tag, fill) { return services.tag.complete({ query: tag }).then(function (tags) { return fill(tags); }); };
            this.canSticky = authentication_1["default"].roleObservable('Administrator');
            if (params.id) {
                services.thread.get({ id: params.id }).then(function (newsDto) { return _this.thread(newsDto); });
            }
        }
        return ViewModel;
    }());
    exports.ViewModel = ViewModel;
    exports.viewModel = ViewModel;
});
