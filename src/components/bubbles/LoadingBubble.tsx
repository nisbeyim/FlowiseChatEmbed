import { TypingBubble } from "@/components";
import { Show } from "solid-js";
import { Avatar } from "../avatars/Avatar";

export const LoadingBubble = () => (
  <div class="flex justify-start items-center items-start animate-fade-in host-container">
    <figure
      class={
        "flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#FFF] p-[2px] w-10 h-10 "
      }
    >
      <div
        class={
          "flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#60C8FA] "
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
        >
          <path
            d="M18.7517 7.49055L19.4895 5.27734H20.7714L21.5092 7.49055L23.7224 8.22828V9.51024L21.5092 10.248L20.7714 12.4612H19.4895L18.7517 10.248L16.5385 9.51024V8.22828L18.7517 7.49055Z"
            fill="#FFFCFF"
          />
          <path
            d="M21.2565 14.4997V22.3823H19.0044V14.4997H21.2565Z"
            fill="#FFFCFF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.24943 7.74318H12.9941L16.7893 22.3823H14.4627L13.5869 19.004H8.65658L7.78073 22.3823H5.4541L9.24943 7.74318ZM9.24047 16.7519H13.003L11.2513 9.99535H10.9922L9.24047 16.7519Z"
            fill="#FFFCFF"
          />
        </svg>
      </div>
    </figure>
    <span
      class="p-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble rounded-2xl flex flex-row gap-1"
      data-testid="host-bubble"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="4"
        viewBox="0 0 5 4"
        fill="none"
      >
        <circle cx="2.5" cy="2" r="2" fill="#60C8FA" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="4"
        viewBox="0 0 5 4"
        fill="none"
      >
        <circle cx="2.5" cy="2" r="2" fill="#60C8FA" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="4"
        viewBox="0 0 5 4"
        fill="none"
      >
        <circle cx="2.5" cy="2" r="2" fill="#60C8FA" />
      </svg>
    </span>
  </div>
);
