import { Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { SendIcon } from "./icons";

type SendButtonProps = {
  sendButtonColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableIcon?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const SendButton = (props: SendButtonProps) => {
  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      {...props}
      class={
        "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " +
        props.class
      }
      style={{ background: "transparent", border: "none" }}
    >
      <Show when={!props.isLoading} fallback={<Spinner class="text-white" />}>
        <SendIcon
          color={props.sendButtonColor}
          class={"send-icon flex " + (props.disableIcon ? "hidden" : "")}
        />
      </Show>
    </button>
  );
};

export const Spinner = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <g clip-path="url(#clip0_17403_105694)">
      <path
        d="M23.4377 12.4888C23.4384 12.7672 23.3647 13.0407 23.2243 13.2811C23.0838 13.5215 22.8817 13.7199 22.6388 13.856L6.2404 23.232C6.00508 23.3654 5.73941 23.436 5.46892 23.4371C5.21969 23.4357 4.97439 23.3748 4.75352 23.2593C4.53264 23.1439 4.34258 22.9773 4.19921 22.7734C4.05585 22.5695 3.96333 22.3343 3.92938 22.0874C3.89543 21.8405 3.92104 21.589 4.00407 21.354L6.64079 13.5464C6.66656 13.4701 6.7153 13.4036 6.78034 13.356C6.84537 13.3085 6.92352 13.2822 7.00407 13.2808H14.0627C14.1698 13.281 14.2758 13.2592 14.3741 13.2168C14.4724 13.1743 14.561 13.1121 14.6342 13.034C14.7075 12.9559 14.7639 12.8635 14.8 12.7627C14.8361 12.6618 14.851 12.5547 14.8439 12.4478C14.8262 12.2469 14.7332 12.0601 14.5837 11.9248C14.4341 11.7896 14.2389 11.7158 14.0373 11.7183H7.00603C6.9243 11.7183 6.84463 11.6927 6.77823 11.645C6.71184 11.5974 6.66206 11.5301 6.63591 11.4527L3.99919 3.64604C3.89424 3.34681 3.88282 3.02274 3.96644 2.71686C4.05006 2.41099 4.22477 2.1378 4.46735 1.93358C4.70993 1.72937 5.0089 1.60379 5.32455 1.57354C5.6402 1.54328 5.95759 1.60978 6.23454 1.7642L22.6408 11.1285C22.8823 11.2642 23.0834 11.4617 23.2234 11.7008C23.3634 11.9398 23.4374 12.2118 23.4377 12.4888Z"
        fill="#55BBEB"
      />
    </g>
    <defs>
      <clipPath id="clip0_17403_105694">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
