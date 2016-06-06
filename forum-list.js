var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'knockout', 'services/services', '../folke-identity/authentication'], function (require, exports, ko, services, authentication_1) {
    "use strict";
    var Forum = (function (_super) {
        __extends(Forum, _super);
        function Forum(data) {
            var _this = this;
            _super.call(this, data);
            this.selected = ko.observable(false);
            this.url = ko.pureComputed(function () { return "#forum/" + _this.id; });
        }
        return Forum;
    }(services.ForumView));
    var ForumViewModel = (function () {
        function ForumViewModel(parameters) {
            var _this = this;
            this.forums = ko.observableArray();
            this.refresh = function () {
                services.forum.getAllT(function (data) { return new Forum(data); }, {}).then(function (forums) { return _this.forums(forums); });
            };
            this.isAdministrator = authentication_1["default"].roleObservable('Administrator');
            this.selected = parameters['selected'];
            this.refresh();
        }
        return ForumViewModel;
    }());
    exports.viewModel = ForumViewModel;
});
