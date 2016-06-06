import *as ko from 'knockout';
import * as services from 'services/services';
import * as authentication from '../folke-identity/authentication';

export interface Parameters {
    threadId: number | KnockoutObservable<number>;
}

export class CommentListViewModel {
    threadId: number;

    constructor(parameters: Parameters) {
        this.threadId = ko.unwrap(parameters.threadId);
        services.thread.getComments({ threadId: this.threadId }).then(comments => this.comments(comments));
    }

    newComment = new services.CommentView({ text: "" })
    comments = ko.observableArray<services.CommentView>()

    addComment = () => {
        services.thread.postComment({ threadId: this.threadId, value: this.newComment }).then(commentDto => {
            this.newComment.text("");
            this.comments.unshift(commentDto);
        });
    }

    canComment = authentication.default.logged;
}

export var viewModel = CommentListViewModel;