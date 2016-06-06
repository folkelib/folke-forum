import *as ko from 'knockout';
import * as services from 'services/services';
import * as imageUpload from 'bower_components/folke-ko-imageupload/folke-ko-imageupload';
import authentication from '../folke-identity/authentication';
import * as wysiwyg from '../folke-ko-wysiwyg/wysiwyg';

interface Parameters {
    id?: number;
    forumId?: number;
}

export class ViewModel {
    public thread = ko.observable(new services.ThreadFullView());

    public wysiwyg = new wysiwyg.CommandState();

    constructor(public params: Parameters) {
        if (params.id) {
            services.thread.get({ id: params.id }).then(newsDto => this.thread(newsDto));
        }
    }

    canSave = this.thread().isValid

    imageUploadOptions = new imageUpload.Options("/api/image", data => {
        if (!this.thread().photos())
            this.thread().photos([]);
        this.thread().photos.push(new services.PhotoView(data));
    });

    public saveThread = () => {
        if (this.thread().id) {
            services.thread.put({ id: this.thread().id, value: this.thread() }).then(() => window.location.hash = `news/${this.thread().id}`);
        }
        else {
            services.thread.post({ forumId: this.params.forumId, value: this.thread() }).then(news => window.location.hash = `news/${news.id}`);
        }
    }

    public goBack = () => location.hash = '#news';
    public completeTag = (tag: string, fill: (tags: string[]) => void) => services.tag.complete({ query: tag }).then(tags => fill(tags));

    canSticky = authentication.roleObservable('Administrator');
}

export var viewModel = ViewModel;