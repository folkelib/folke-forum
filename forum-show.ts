import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    id: number;
}

export class ForumShowViewModel {
    forum = ko.observable<services.ForumView>();

    constructor(parameters: Parameters) {
        services.forum.get({ id: parameters.id }).then(forum => this.forum(forum));
    }

    public canEdit = ko.pureComputed(() => this.forum() && authentication.roleObservable('Administrator'));

    public editForum = () => location.hash = `forum/${this.forum().id}/edit`;
}

export var viewModel = ForumShowViewModel;