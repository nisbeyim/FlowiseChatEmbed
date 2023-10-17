import { registerWebComponents } from './register'
import { parseChatbot, injectChatbotInWindow } from './window'

/** Aybjax interceptor */
import fetchIntercept from 'fetch-intercept';

const isBotUri = (url: string): boolean => ['10.25.1.50:3000', 'ne znayu: dopishi'].some(backendUrl => {
        return url.includes(backendUrl)
    });

const unregister = fetchIntercept.register({
    request: function (url: any, config: any) {
        if(! isBotUri(url)) return [url, config];
        console.log('[chatbot front]: URL is defined')

        const accessToken = document.cookie.split('; ').find(c => c.includes('accessToken'))?.split('=') ?? []

        if(accessToken.length != 2) return [url, config];

        const headers = config?.headers ?? {};
        //@ts-ignore
        headers.Authorization = `Bearer ${accessToken[1]}`;

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

export default chatbot
