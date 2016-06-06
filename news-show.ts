import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    id?: number;
    news?: services.ThreadFullView | KnockoutObservable<services.ThreadFullView>;
}

export class NewsShowViewModel {
    public news = ko.observable<services.ThreadFullView>();

    constructor(parameters: Parameters) {
        if (parameters.news) {
            this.news(ko.unwrap(parameters.news));
        }
        else {
            services.thread.get({ id: parameters.id }).then(news => this.news(news));
            this.commentShown(true);
        }
    }

    loadComments = () => {
        this.commentShown(true);
    }

    canEdit = ko.pureComputed(() => this.news() && (authentication.roleObservable('Administrator') || authentication.account().id == this.news().author().id))

    commentShown: KnockoutObservable<boolean> = ko.observable(false)

    link = ko.pureComputed(() => this.news() ? "#news/" + this.news().id : '');

    editNews = () => location.hash = '#news-edit/' + this.news().id;
}

export var viewModel = NewsShowViewModel;