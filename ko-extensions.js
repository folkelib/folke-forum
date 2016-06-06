define(["require", "exports", 'knockout', '../folke-identity/authentication', '../folke-core/folke-utils'], function (require, exports, ko, authentication_1, folke_utils_1) {
    "use strict";
    function fixHtmlLinks(html, extended) {
        if (extended) {
            html = html.replace(/http:\/\/youtu.be\/(\w+)/g, '<iframe width="560" height="315" src="//www.youtube.com/embed/$1?wmode=transparent&html5=1" frameborder="0" allowfullscreen="true" style="max-width:100%"></iframe>');
        }
        html = html.replace(/(https?:\/\/[\w\.%\-\/?&;=#]+)/g, '<a href="$1">$1</a>');
        return html;
    }
    function fixLinks(text, extended) {
        text = text.replace(/&/g, '&amp;');
        text = text.replace(/</g, '&lt;');
        text = text.replace(/\n/g, '<br/>');
        return fixHtmlLinks(text, extended);
    }
    var ChatHandler = (function () {
        function ChatHandler() {
        }
        ChatHandler.prototype.update = function (element, valueAccessor) {
            var text = ko.unwrap(valueAccessor());
            text = fixLinks(text, false);
            var nickname = authentication_1["default"].account().userName();
            text = text.replace('@' + nickname, '<strong>@' + nickname + '</strong>');
            element.innerHTML = text;
        };
        return ChatHandler;
    }());
    ;
    var HtmlxHandler = (function () {
        function HtmlxHandler() {
        }
        HtmlxHandler.prototype.update = function (element, valueAccessor) {
            var html = ko.unwrap(valueAccessor());
            html = fixHtmlLinks(html, true);
            element.innerHTML = html;
        };
        return HtmlxHandler;
    }());
    var TimeHandler = (function () {
        function TimeHandler() {
        }
        TimeHandler.prototype.update = function (element, valueAccessor) {
            var date = ko.unwrap(valueAccessor());
            element.innerHTML = folke_utils_1.twoDigits(date.getHours()) + "h" + folke_utils_1.twoDigits(date.getMinutes());
        };
        return TimeHandler;
    }());
    var LongDateHandler = (function () {
        function LongDateHandler() {
        }
        LongDateHandler.prototype.update = function (element, valueAccessor) {
            element.innerHTML = ko.unwrap(valueAccessor()).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        };
        return LongDateHandler;
    }());
    var DateAndTime = (function () {
        function DateAndTime() {
        }
        DateAndTime.prototype.update = function (element, valueAccessor) {
            element.innerHTML = ko.unwrap(valueAccessor()).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" });
        };
        return DateAndTime;
    }());
    function register() {
        ko.bindingHandlers['chat'] = new ChatHandler();
        ko.bindingHandlers['time'] = new TimeHandler();
        ko.bindingHandlers['longDate'] = new LongDateHandler();
        ko.bindingHandlers['dateAndTime'] = new DateAndTime();
        ko.bindingHandlers['htmlx'] = new HtmlxHandler();
    }
    exports.register = register;
});
