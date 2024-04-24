import { Show, onMount } from "solid-js";
import { Avatar } from "../avatars/Avatar";
import { Marked } from "@ts-stack/markdown";

type Props = {
  message: string;
  showAvatar?: boolean;
  avatarSrc?: string;
  backgroundColor?: string;
  textColor?: string;
};

const defaultBackgroundColor = "#f7f8ff";
const defaultTextColor = "#303235";

Marked.setOptions({ isNoP: true });

export const BotBubble = (props: Props) => {
  let botMessageEl: HTMLDivElement | undefined;

  onMount(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.message);
    }
  });

  return (
    <div
      class="flex justify-start mb-2 items-start host-container relative"
      style={{ "margin-right": "50px" }}
    >
      <Show when={props.showAvatar}>
        <Avatar initialAvatarSrc={props.avatarSrc} />
      </Show>
      <span
        ref={botMessageEl}
        class="p-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble"
        data-testid="host-bubble"
        style={{
          "background-color": props.backgroundColor ?? defaultBackgroundColor,
          color: props.textColor ?? defaultTextColor,
          "border-radius": "16px",
        }}
      />
      <svg
        class="absolute top-[11px] left-[44px]"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
      >
        <path
          d="M9.99992 0L4.99992 14.5C4.99992 14.5 2.99992 12 1.49992 11L0.0389565 10.026C0.0131224 10.0088 0.0135369 9.99312 0.0399678 9.97683C0.256155 9.84353 1.39303 9.05073 4.49992 5.5C7.99992 1.5 9.99992 0 9.99992 0Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
