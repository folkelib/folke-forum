define(["require", "exports", 'knockout', 'services/services'], function (require, exports, ko, services) {
    "use strict";
    var ForumEditViewModel = (function () {
        function ForumEditViewModel(parameters) {
            var _this = this;
            this.editedForum = ko.observable();
            this.roles = ko.observableArray();
            this.saveForum = function () {
                if (_this.editedForum().id) {
                    services.forum.put({ id: _this.editedForum().id, value: _this.editedForum() })
                        .then(function () { return window.location.hash = 'forums'; });
                }
                else {
                    services.forum.post({ value: _this.editedForum() })
                        .then(function () { return window.location.hash = 'forums'; });
                }
            };
            if (parameters.forum) {
                this.editedForum(ko.unwrap(parameters.forum));
            }
            else if (parameters.id) {
                services.forum.get({ id: parameters.id }).then(function (forum) { return _this.editedForum(forum); });
            }
            else {
                this.editedForum(new services.ForumView({ name: '' }));
            }
            services.role.getAll({}).then(function (roles) { return _this.roles(roles.map(function (x) { return x.name(); })); });
        }
        return ForumEditViewModel;
    }());
    exports.ForumEditViewModel = ForumEditViewModel;
    exports.viewModel = ForumEditViewModel;
});
