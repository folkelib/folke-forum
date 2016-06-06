import * as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export class LinksViewModel {
    links = ko.observableArray<services.ExternalLinkView>()
    editMode = ko.observable(false)
    canEdit = authentication.roleObservable('Administrator');

    constructor() {
        services.externalLink.getAll({}).then(newsDtos => this.links(newsDtos));
    }

    dispose() {
    }

    deleteLink = (link: services.ExternalLinkView) => {
        services.externalLink.delete({ id: link.id });
        this.links.remove(link);
    }

    saveLink = (link: services.ExternalLinkView) => {
        if (link.id) {
            services.externalLink.put({ id: link.id, value: link });
        }
        else {
            services.externalLink.post({ value: link }).then(newLink => { link.id = newLink.id; });
            // TODO add notification?
        }
    }
    
    addLink = () => {
        this.links.push(new services.ExternalLinkView());
    }

    toggleEdit = () => this.editMode(!this.editMode())
}



