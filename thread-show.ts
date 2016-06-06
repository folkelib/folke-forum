import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    id?: number;
    thread?: services.ThreadView | KnockoutObservable<services.ThreadView>;
}

export class ThreadShowViewModel {
    public thread = ko.observable<services.ThreadView>();

    constructor(parameters: Parameters) {
        if (parameters.thread) {
            this.thread(ko.unwrap(parameters.thread));
        }
        else {
            services.thread.get({ id: parameters.id }).then(thread => {
                this.thread(thread);
            });
        }
    }

    canEdit = ko.pureComputed(() => this.thread() && (authentication.roleObservable('Administrator') || authentication.account().id === this.thread().author().id))

    commentShown: KnockoutObservable<boolean> = ko.observable(false)

    link = ko.pureComputed(() => this.thread() ? "#news/" + this.thread().id : '');

    editThread = () => location.hash = `thread/${this.thread().id}/edit`;
}

export var viewModel = ThreadShowViewModel;


