/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  chatflowConfig?: Record<string, unknown>;
};

export const initFull = (props: BotProps & { id?: string }) => {
  const fullElement = props.id
    ? document.getElementById(props.id)
    : document.querySelector("flowise-fullchatbot");
  if (!fullElement)
    throw new Error(
      "Извините, у нас ведутся технические работы. AI учитель скоро возобновит работу..."
    );
  Object.assign(fullElement, props);
};

export const init = (props: BotProps) => {
  const element = document.createElement("flowise-chatbot");
  Object.assign(element, props);
  document.body.appendChild(element);
};

export class AybjaxData {
  avatar_url: string = "";
  avatar_icon: string = "";
  welcome_message: {
    kk?: string;
    ru?: string;
    en?: string;
    ar?: string;
  } = {};
  placeholder: {
    kk?: string;
    ru?: string;
    en?: string;
    ar?: string;
  } = {};
  name: {
    kk?: string;
    ru?: string;
    en?: string;
    ar?: string;
  } = {};
}

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
  data?: AybjaxData;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  init,
  data: new AybjaxData(),
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === "undefined") return;
  window.Chatbot = { ...bot };
};
