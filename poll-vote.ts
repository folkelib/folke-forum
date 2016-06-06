import *as ko from 'knockout';
import * as services from 'services/services';
import authentication from '../folke-identity/authentication';

export class Choice {
    answer: services.PollPossibleAnswerView
    chosen = ko.observable(false)

    constructor(answer: services.PollPossibleAnswerView) {
        this.answer = answer;
    }
}

export interface Parameters {
    id: number;
}

export class PollVoteViewModel {
    public poll = ko.observable<services.PollView>();
    public choices = ko.observableArray<Choice>();
    public displayOnly = ko.observable(false);

    // TODO: Vérifier si l'account a déjà voté
    // Auquel cas afficher seulement les résultats
    constructor(params: Parameters) {
        services.poll.getPollAndVote({ id: params.id }).then(pollAndVoteDto => {
            this.poll(pollAndVoteDto.poll());
            this.choices(this.poll().possibleAnswers().map((element, index, array) => new Choice(element)));
            this.displayOnly(pollAndVoteDto.answer().id != null);
        });
    }

    public close() {
        return false;
    }
    
    addVote = () => {
        this.displayOnly(true);
        var choice = this.choices().filter((value, index, array) => value.chosen());
        if (choice.length == 1) {
            services.pollChosenAnswer.addAnswer({ pollId: this.poll().id, value: choice[0].answer })
                .then(answerDto => choice[0].answer.count(choice[0].answer.count() + 1));
        }
    }
}