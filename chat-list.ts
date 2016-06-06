import * as ko from 'knockout';
import * as services from 'services/services';
import * as infiniteScroll from '../folke-ko-infinite-scroll/infinite-scroll';
import * as utils from '../folke-core/folke-utils';
import authentication from  '../folke-identity/authentication';

export class ChatDataViewModel {
    chats = infiniteScroll.scrollableArray({ parameters: {}, request: services.chat.getAll });
    newChat = new services.ChatView();
    interval = null;
    newChats = ko.observable('0');
        
    addHourToChat = (chat: services.ChatView) => {
        this.newChat.text(this.newChat.text() + " >" + chat.creationDate().getHours() + "h" + utils.twoDigits(chat.creationDate().getMinutes()));
    };

    addNameToChat = (chat: services.ChatView) => {
        this.newChat.text(this.newChat.text() + ' @' + chat.author().userName());
    };

    sendChat = () => {
        services.chat.post({ value: this.newChat }).then(data => this.chats.unshift(data));
        this.newChat.text("");
    }

    canSendChat = authentication.logged;

    updateChat = () => {
        services.chat.getAll({ offset: 0 }).then(newChats => {
            var chatsToAdd: services.ChatView[] = [];
            var previous = this.chats()[0];
            for (var i in newChats) {
                var item = newChats[i];
                if (previous && item.id == previous.id)
                    break;
                chatsToAdd.push(item);
            }
            if (chatsToAdd.length > 0)
                this.chats(chatsToAdd.concat(this.chats()));
        });
    }
        
    constructor() {
        this.newChat.text('');
        this.newChats(null);
        this.chats.refresh();
        this.interval = setInterval(this.updateChat, 10000);
    }

    dispose() {
        clearInterval(this.interval);
    }

    dateChanged = index => {
        var i = index();
        if (i == 0)
            return true;
        var chats = this.chats();
        return chats[i].creationDate().getDate() != chats[i - 1].creationDate().getDate();
    };
}

export var viewModel = ChatDataViewModel;   
