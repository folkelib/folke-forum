define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var LinksViewModel = (function () {
        function LinksViewModel() {
            var _this = this;
            this.links = ko.observableArray();
            this.editMode = ko.observable(false);
            this.canEdit = authentication_1["default"].roleObservable('Administrator');
            this.deleteLink = function (link) {
                services.externalLink.delete({ id: link.id });
                _this.links.remove(link);
            };
            this.saveLink = function (link) {
                if (link.id) {
                    services.externalLink.put({ id: link.id, value: link });
                }
                else {
                    services.externalLink.post({ value: link }).then(function (newLink) { link.id = newLink.id; });
                }
            };
            this.addLink = function () {
                _this.links.push(new services.ExternalLinkView());
            };
            this.toggleEdit = function () { return _this.editMode(!_this.editMode()); };
            services.externalLink.getAll({}).then(function (newsDtos) { return _this.links(newsDtos); });
        }
        LinksViewModel.prototype.dispose = function () {
        };
        return LinksViewModel;
    }());
    exports.LinksViewModel = LinksViewModel;
});
