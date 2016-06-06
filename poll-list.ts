import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export class PollListViewModel {
    public polls = ko.observableArray<services.PollView>([]);
    constructor() {
        services.poll.get({ }).then(pollDtos => this.polls(pollDtos));
    }

    public removePoll = (poll: services.PollView) => {
        services.poll.delete({ id: poll.id }).then(() => this.polls.remove(poll));
    }
} 

export var viewModel = PollListViewModel;