import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';
import * as infiniteScroll from '../folke-ko-infinite-scroll/infinite-scroll';
import * as helpers from '../folke-ko-service-helpers/folke-ko-service-helpers';
import { isObservable } from '../folke-core/folke-utils';

export interface Parameters {
    forum: services.ForumView | KnockoutObservable<services.ForumView>;
}

export class ThreadListViewModel {
    threads = infiniteScroll.scrollableArray({ request: services.thread.getFromForum, parameters: { forumId: 10 } });
    forum: services.ForumView;

    constructor(parameters: Parameters) {
        this.forum = ko.unwrap(parameters.forum);

        if (this.forum) {
            this.threads.options.parameters.forumId = this.forum.id;
            if (this.threads.options.parameters.forumId) {
                this.threads.refresh();
            }
            this.canWrite = this.forum.writeRole() ? authentication.roleObservable(this.forum.writeRole()) : ko.observable(true);
        }
    }

    newThread = () => location.hash = 'forum/' + this.forum.id + '/threads/add';

    canWrite: KnockoutObservable<boolean>;

    isNew = (thread: services.ThreadView) => thread.lastViewedId() === 0 && authentication.logged();
    getUrl = (thread: services.ThreadView) => `#thread/${thread.id}`;
}

export var viewModel = ThreadListViewModel;