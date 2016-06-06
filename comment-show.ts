import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    comment?: services.CommentView | KnockoutObservable<services.CommentView>;
    id?: number;
}

export class CommentViewModel {
    comment = ko.observable<services.CommentView>();

    constructor(parameters: Parameters) {
        if (parameters.id) {
            services.comment.get({ id: parameters.id }).then(comment => this.comment(comment));
        }
        else {
            this.comment(ko.unwrap(parameters.comment));
        }
    }

    editMode = ko.observable(false);

    editComment = () => {
        this.editMode(true);
    }

    canEdit = ko.pureComputed(() => {
        return this.comment().author() && this.comment().author().id == authentication.account().id;
    });

    saveComment = () => {
        this.editMode(false);
        services.comment.put({ id: this.comment().id, value: this.comment() });
    }
}

export var viewModel = CommentViewModel;