import { registerWebComponents } from './register'
import { parseChatbot, injectChatbotInWindow } from './window'
 
/** Aybjax interceptor */
// import fetchIntercept from 'fetch-intercept';
import {avatar_url, avatar_icon} from './assets/avatar';
import * as welcome_msgs from './assets/welcome_msg';
import * as placeholders from './assets/placeholders';

registerWebComponents()

const chatbot = parseChatbot()

injectChatbotInWindow(chatbot)

chatbot.data.avatar_url = avatar_url
chatbot.data.avatar_icon = avatar_icon
chatbot.data.welcome_message = {
    ru: welcome_msgs.ru,
    kk: welcome_msgs.kk,
    en: welcome_msgs.en,
    ar: welcome_msgs.ar,
}
chatbot.data.placeholder = {
    ru: placeholders.ru,
    kk: placeholders.kk,
    en: placeholders.en,
    ar: placeholders.ar,
}
export default chatbot
