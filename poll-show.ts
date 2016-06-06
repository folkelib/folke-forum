import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export interface Parameters {
    id?: number;
}

export class PollShowViewModel {
    public poll = ko.observable<services.PollView>();
    public newPoll: boolean;
    
    addPossibleAnswer = () => {
        this.poll().possibleAnswers.push(new services.PollPossibleAnswerView());
    }
    removePossibleAnswer = (answer: services.PollPossibleAnswerView) => {
        this.poll().possibleAnswers.remove(answer);
    }

    save = () => {
        if (this.newPoll) {
            services.poll.post({ pollView: this.poll() }).then(pollDto => {
                this.poll(pollDto);
                this.newPoll = false;
                location.href = '#poll-main';
            });
        }
        else {
            services.poll.put({ id: this.poll().id, pollView: this.poll() }).then(() => { location.hash = "poll-main";});
        }                        
    }
    
    constructor(params:Parameters) {
        if (!params.id) {
            this.newPoll = true;
            this.poll(new services.PollView());
        }
        else {
            this.newPoll = false;
            services.poll.getPoll({ id: params['id'] }).then(pollDto => this.poll(pollDto));
        }
    }
}