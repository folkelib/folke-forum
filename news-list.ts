import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';
import * as infiniteScroll from '../folke-ko-infinite-scroll/infinite-scroll';
import * as helpers from '../folke-ko-service-helpers/folke-ko-service-helpers';

export class NewsListDataViewModel {
    news = infiniteScroll.scrollableArray({ request: services.thread.getFromForum, parameters: { forumId: 10 } });
    forum = ko.observable<services.ForumView>();

    constructor(parameters) {
        services.forum.getByName({ name: 'News' }).then(forum => {
            this.forum(forum);

            this.news.options.parameters.forumId = forum.id;
            this.news.refresh();
        });
    }

    close() { 
        return false;
    }

    newNews = () => location.hash = '#news-edit';

    canEdit = ko.pureComputed(() => this.forum() && authentication.roleObservable(this.forum().writeRole())());
}

export var viewModel = NewsListDataViewModel;