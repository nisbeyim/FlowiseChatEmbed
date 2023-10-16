import { registerWebComponents } from './register'
import { parseChatbot, injectChatbotInWindow } from './window'

/** Aybjax interceptor */
import fetchIntercept from 'fetch-intercept';

//@ts-ignore
// window.getAuthentication = () => "Bearer key"
//@ts-ignore
// window.getBotUri = '10.25.1.50:3000'

const unregister = fetchIntercept.register({
    request: function (url: any, config: any) {
        //@ts-ignore
        if(url.includes(window.getBotUri)) {
            const headers = config?.headers ?? {};
            //@ts-ignore
            headers.Authorization = window.getAuthentication();

            if(!config) {
                config = {};
            }

            config.headers = headers;
        }

        // Modify the url or config here
        return [url, config];
    },
});

/** Aybjax interceptor end */

registerWebComponents()

const chatbot = parseChatbot()

injectChatbotInWindow(chatbot)

export default chatbot
