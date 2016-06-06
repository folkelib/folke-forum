import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    forum?: KnockoutObservable<services.ForumView> | services.ForumView;
    id?: number;
}

export class ForumEditViewModel {
    editedForum = ko.observable<services.ForumView>();
    roles = ko.observableArray<string>();

    constructor(parameters: Parameters) {
        if (parameters.forum) {
            this.editedForum(ko.unwrap(parameters.forum));
        }
        else if (parameters.id) {
            services.forum.get({ id: parameters.id }).then(forum => this.editedForum(forum));
        }
        else {
            this.editedForum(new services.ForumView({ name: '' }));
        }
        services.role.getAll({}).then(roles => this.roles(roles.map(x => x.name())));
    }

    public saveForum = () => {
        if (this.editedForum().id) {
            services.forum.put({ id: this.editedForum().id, value: this.editedForum() })
                .then(() => window.location.hash = 'forums');
        }
        else {
            services.forum.post({ value: this.editedForum() })
                .then(() => window.location.hash = 'forums');
        }
    }
}

export var viewModel = ForumEditViewModel;
