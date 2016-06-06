import application from "../folke-core/folke";
import authentication from '../folke-identity/authentication';
import menu from '../folke-menu/menu';
import * as ko from 'knockout';
import * as koExtensions from './ko-extensions';
import * as wysiwyg from '../folke-ko-wysiwyg/wysiwyg';
import * as imageUpload from '../folke-ko-imageupload/folke-ko-imageupload';

export function register(basePath: string) {
    koExtensions.register();
    wysiwyg.register();
    imageUpload.register();
    application.registerComponent(basePath, 'chat-list');
    application.addRoute('chat', 'chat-list');
    application.registerComponent(basePath, 'comment-list');
    application.addRoute('thread/{threadId}/comments', 'comment-list');
    application.registerComponent(basePath, 'comment-show');
    application.addRoute('comment/{id}', 'comment-list');
    application.registerComponent(basePath, 'forum-edit');
    application.addRoute('forum/{id}/edit', 'forum-edit');
    application.addRoute('forums/add', 'forum-edit');
    application.registerComponent(basePath, 'forum-list');
    application.addRoute('forums', 'forum-list');
    application.registerComponent(basePath, 'forum-show');
    application.addRoute('forum/{id}', 'forum-show');
    application.registerComponent(basePath, 'links-list');
    application.registerComponent(basePath, 'news-list');
    application.addRoute('news', 'news-list');
    application.registerComponent(basePath, 'news-show');
    application.addRoute('news/{id}', 'news-show');
    application.registerComponent(basePath, 'poll-list');
    application.addRoute('polls', 'poll-list');
    application.registerComponent(basePath, 'poll-show');
    application.addRoute('poll/{id}', 'poll-show');
    application.registerComponent(basePath, 'poll-vote');
    application.registerComponent(basePath, 'thread-edit');
    application.addRoute('thread/{id}/edit', 'thread-edit');
    application.addRoute('forum/{forumId}/threads/add', 'thread-edit');
    application.registerComponent(basePath, 'thread-list');
    application.addRoute('forum/{id}/threads', 'thread-list');
    application.registerComponent(basePath, 'thread-show');
    application.addRoute('thread/{id}', 'thread-show');
}

export function registerMenu(basePath: string) {
    menu.addRouteButton(ko.observable('News'), 'news');
    menu.addRouteButton(ko.observable('Chat'), 'chat');
    menu.addRouteButton(ko.observable('Forums'), 'forums');
}
