define(["require", "exports", 'knockout', 'services/services'], function (require, exports, ko, services) {
    "use strict";
    var PollShowViewModel = (function () {
        function PollShowViewModel(params) {
            var _this = this;
            this.poll = ko.observable();
            this.addPossibleAnswer = function () {
                _this.poll().possibleAnswers.push(new services.PollPossibleAnswerView());
            };
            this.removePossibleAnswer = function (answer) {
                _this.poll().possibleAnswers.remove(answer);
            };
            this.save = function () {
                if (_this.newPoll) {
                    services.poll.post({ pollView: _this.poll() }).then(function (pollDto) {
                        _this.poll(pollDto);
                        _this.newPoll = false;
                        location.href = '#poll-main';
                    });
                }
                else {
                    services.poll.put({ id: _this.poll().id, pollView: _this.poll() }).then(function () { location.hash = "poll-main"; });
                }
            };
            if (!params.id) {
                this.newPoll = true;
                this.poll(new services.PollView());
            }
            else {
                this.newPoll = false;
                services.poll.getPoll({ id: params['id'] }).then(function (pollDto) { return _this.poll(pollDto); });
            }
        }
        return PollShowViewModel;
    }());
    exports.PollShowViewModel = PollShowViewModel;
});
