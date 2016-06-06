import * as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

class Forum extends services.ForumView {
    selected = ko.observable(false);
    constructor(data:services.ForumViewData) {
        super(data);
    }
    
    url = ko.pureComputed(() => "#forum/" + this.id);
}

class ForumViewModel {
    forums = ko.observableArray<Forum>();
    selected: number;
    
    constructor(parameters) {
        this.selected = parameters['selected'];
        this.refresh();
    }
    
    refresh = () => {
        services.forum.getAllT(data => new Forum(data), {}).then(forums => this.forums(forums));
    }

    isAdministrator = authentication.roleObservable('Administrator');
}

export var viewModel = ForumViewModel;
    