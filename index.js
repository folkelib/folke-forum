define(["require", "exports", "../folke-core/folke", '../folke-menu/menu', 'knockout', './ko-extensions', '../folke-ko-wysiwyg/wysiwyg', '../folke-ko-imageupload/folke-ko-imageupload'], function (require, exports, folke_1, menu_1, ko, koExtensions, wysiwyg, imageUpload) {
    "use strict";
    function register(basePath) {
        koExtensions.register();
        wysiwyg.register();
        imageUpload.register();
        folke_1["default"].registerComponent(basePath, 'chat-list');
        folke_1["default"].addRoute('chat', 'chat-list');
        folke_1["default"].registerComponent(basePath, 'comment-list');
        folke_1["default"].addRoute('thread/{threadId}/comments', 'comment-list');
        folke_1["default"].registerComponent(basePath, 'comment-show');
        folke_1["default"].addRoute('comment/{id}', 'comment-list');
        folke_1["default"].registerComponent(basePath, 'forum-edit');
        folke_1["default"].addRoute('forum/{id}/edit', 'forum-edit');
        folke_1["default"].addRoute('forums/add', 'forum-edit');
        folke_1["default"].registerComponent(basePath, 'forum-list');
        folke_1["default"].addRoute('forums', 'forum-list');
        folke_1["default"].registerComponent(basePath, 'forum-show');
        folke_1["default"].addRoute('forum/{id}', 'forum-show');
        folke_1["default"].registerComponent(basePath, 'links-list');
        folke_1["default"].registerComponent(basePath, 'news-list');
        folke_1["default"].addRoute('news', 'news-list');
        folke_1["default"].registerComponent(basePath, 'news-show');
        folke_1["default"].addRoute('news/{id}', 'news-show');
        folke_1["default"].registerComponent(basePath, 'poll-list');
        folke_1["default"].addRoute('polls', 'poll-list');
        folke_1["default"].registerComponent(basePath, 'poll-show');
        folke_1["default"].addRoute('poll/{id}', 'poll-show');
        folke_1["default"].registerComponent(basePath, 'poll-vote');
        folke_1["default"].registerComponent(basePath, 'thread-edit');
        folke_1["default"].addRoute('thread/{id}/edit', 'thread-edit');
        folke_1["default"].addRoute('forum/{forumId}/threads/add', 'thread-edit');
        folke_1["default"].registerComponent(basePath, 'thread-list');
        folke_1["default"].addRoute('forum/{id}/threads', 'thread-list');
        folke_1["default"].registerComponent(basePath, 'thread-show');
        folke_1["default"].addRoute('thread/{id}', 'thread-show');
    }
    exports.register = register;
    function registerMenu(basePath) {
        menu_1["default"].addRouteButton(ko.observable('News'), 'news');
        menu_1["default"].addRouteButton(ko.observable('Chat'), 'chat');
        menu_1["default"].addRouteButton(ko.observable('Forums'), 'forums');
    }
    exports.registerMenu = registerMenu;
});
