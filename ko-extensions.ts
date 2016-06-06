import * as ko from 'knockout';
import authentication from '../folke-identity/authentication';
import {twoDigits} from '../folke-core/folke-utils';

function fixHtmlLinks(html: string, extended: boolean) {
    if (extended) {
        html = html.replace(/http:\/\/youtu.be\/(\w+)/g, '<iframe width="560" height="315" src="//www.youtube.com/embed/$1?wmode=transparent&html5=1" frameborder="0" allowfullscreen="true" style="max-width:100%"></iframe>');
    }
    html = html.replace(/(https?:\/\/[\w\.%\-\/?&;=#]+)/g, '<a href="$1">$1</a>');
    return html;
}

function fixLinks(text: string, extended: boolean) {
    text = text.replace(/&/g, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/\n/g, '<br/>');
    return fixHtmlLinks(text, extended);
}

class ChatHandler implements KnockoutBindingHandler {
    update(element: HTMLElement, valueAccessor: () => KnockoutObservable<string>) {
        var text = ko.unwrap(valueAccessor());
        text = fixLinks(text, false);
        var nickname = authentication.account().userName();
        text = text.replace('@' + nickname, '<strong>@' + nickname + '</strong>');
        element.innerHTML = text;
    }
};

class HtmlxHandler implements KnockoutBindingHandler {
    update(element: HTMLElement, valueAccessor: () => string | KnockoutObservable<string>) {
        var html = ko.unwrap(valueAccessor());
        html = fixHtmlLinks(html, true);
        element.innerHTML = html;
    }
}

class TimeHandler implements KnockoutBindingHandler {
    update(element: HTMLElement, valueAccessor: () => KnockoutObservable<Date>) {
        var date = ko.unwrap(valueAccessor());
        element.innerHTML = twoDigits(date.getHours()) + "h" + twoDigits(date.getMinutes());
    }
}

class LongDateHandler implements KnockoutBindingHandler {
    update(element: HTMLElement, valueAccessor: () => Date | KnockoutObservable<Date>) {
        element.innerHTML = ko.unwrap(valueAccessor()).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
}

class DateAndTime implements KnockoutBindingHandler {
    update(element: HTMLElement, valueAccessor: () => Date | KnockoutObservable<Date>) {
        element.innerHTML = ko.unwrap(valueAccessor()).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" });
    }
}

export function register() { 
    ko.bindingHandlers['chat'] = new ChatHandler();
    ko.bindingHandlers['time'] = new TimeHandler();
    ko.bindingHandlers['longDate'] = new LongDateHandler();
    ko.bindingHandlers['dateAndTime'] = new DateAndTime();
    ko.bindingHandlers['htmlx'] = new HtmlxHandler();
}