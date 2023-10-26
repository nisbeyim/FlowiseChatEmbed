import { registerWebComponents } from './register'
import { parseChatbot, injectChatbotInWindow } from './window'

/** Aybjax interceptor */
import fetchIntercept from 'fetch-intercept';
import {avatar_url, avatar_icon} from './assets/avatar'
import * as welcome_msgs from './assets/welcome_msg'
import * as placeholders from './assets/placeholders'

const isBotUri = (url: string): boolean => ['10.25.1.50:3000', 'ne znayu: dopishi'].some(backendUrl => {
        return url.includes(backendUrl)
    });

const unregister = fetchIntercept.register({
    request: function (url: any, config: any) {
        if(! isBotUri(url)) return [url, config];
        console.log('[chatbot front]: URL is defined')

        const accessToken = document.cookie.split('; ').find(c => c.includes('idToken'))?.split('=') ?? []

        if(accessToken.length != 2) return [url, config];

        const headers = config?.headers ?? {};
        //@ts-ignore
        headers['X-API-KEY'] = `Bearer ${accessToken[1]}`;

        if(!config) {
            config = {};
        }

        config.headers = headers;

        // Modify the url or config here
        return [url, config];
    },
});

/** Aybjax interceptor end */

registerWebComponents()

const chatbot = parseChatbot()

injectChatbotInWindow(chatbot)

chatbot.data.avatar_url = avatar_url
chatbot.data.avatar_icon = avatar_icon
chatbot.data.welcome_message = {
    ru: welcome_msgs.ru,
    kk: welcome_msgs.kk,
    en: welcome_msgs.en,
}
chatbot.data.placeholder = {
    ru: placeholders.ru,
    kk: placeholders.kk,
    en: placeholders.en,
}
export default chatbot
