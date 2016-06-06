define(["require", "exports", 'knockout', 'services/services', '../folke-ko-infinite-scroll/infinite-scroll', '../folke-core/folke-utils', '../folke-identity/authentication'], function (require, exports, ko, services, infiniteScroll, utils, authentication_1) {
    "use strict";
    var ChatDataViewModel = (function () {
        function ChatDataViewModel() {
            var _this = this;
            this.chats = infiniteScroll.scrollableArray({ parameters: {}, request: services.chat.getAll });
            this.newChat = new services.ChatView();
            this.interval = null;
            this.newChats = ko.observable('0');
            this.addHourToChat = function (chat) {
                _this.newChat.text(_this.newChat.text() + " >" + chat.creationDate().getHours() + "h" + utils.twoDigits(chat.creationDate().getMinutes()));
            };
            this.addNameToChat = function (chat) {
                _this.newChat.text(_this.newChat.text() + ' @' + chat.author().userName());
            };
            this.sendChat = function () {
                services.chat.post({ value: _this.newChat }).then(function (data) { return _this.chats.unshift(data); });
                _this.newChat.text("");
            };
            this.canSendChat = authentication_1["default"].logged;
            this.updateChat = function () {
                services.chat.getAll({ offset: 0 }).then(function (newChats) {
                    var chatsToAdd = [];
                    var previous = _this.chats()[0];
                    for (var i in newChats) {
                        var item = newChats[i];
                        if (previous && item.id == previous.id)
                            break;
                        chatsToAdd.push(item);
                    }
                    if (chatsToAdd.length > 0)
                        _this.chats(chatsToAdd.concat(_this.chats()));
                });
            };
            this.dateChanged = function (index) {
                var i = index();
                if (i == 0)
                    return true;
                var chats = _this.chats();
                return chats[i].creationDate().getDate() != chats[i - 1].creationDate().getDate();
            };
            this.newChat.text('');
            this.newChats(null);
            this.chats.refresh();
            this.interval = setInterval(this.updateChat, 10000);
        }
        ChatDataViewModel.prototype.dispose = function () {
            clearInterval(this.interval);
        };
        return ChatDataViewModel;
    }());
    exports.ChatDataViewModel = ChatDataViewModel;
    exports.viewModel = ChatDataViewModel;
});
