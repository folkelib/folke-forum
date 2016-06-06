define(["require", "exports", 'knockout', 'services/services'], function (require, exports, ko, services) {
    "use strict";
    var Choice = (function () {
        function Choice(answer) {
            this.chosen = ko.observable(false);
            this.answer = answer;
        }
        return Choice;
    }());
    exports.Choice = Choice;
    var PollVoteViewModel = (function () {
        // TODO: Vérifier si l'account a déjà voté
        // Auquel cas afficher seulement les résultats
        function PollVoteViewModel(params) {
            var _this = this;
            this.poll = ko.observable();
            this.choices = ko.observableArray();
            this.displayOnly = ko.observable(false);
            this.addVote = function () {
                _this.displayOnly(true);
                var choice = _this.choices().filter(function (value, index, array) { return value.chosen(); });
                if (choice.length == 1) {
                    services.pollChosenAnswer.addAnswer({ pollId: _this.poll().id, value: choice[0].answer })
                        .then(function (answerDto) { return choice[0].answer.count(choice[0].answer.count() + 1); });
                }
            };
            services.poll.getPollAndVote({ id: params.id }).then(function (pollAndVoteDto) {
                _this.poll(pollAndVoteDto.poll());
                _this.choices(_this.poll().possibleAnswers().map(function (element, index, array) { return new Choice(element); }));
                _this.displayOnly(pollAndVoteDto.answer().id != null);
            });
        }
        PollVoteViewModel.prototype.close = function () {
            return false;
        };
        return PollVoteViewModel;
    }());
    exports.PollVoteViewModel = PollVoteViewModel;
});
