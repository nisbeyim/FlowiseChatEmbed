import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { isNotDefined } from "@/utils/index";
import { ButtonTheme } from "../types";

type Props = ButtonTheme & {
  isBotOpened: boolean;
  toggleBot: () => void;
  closeBot: () => void;
};

const defaultButtonColor = "#3B81F6";
const defaultIconColor = "white";
const defaultBottom = "96";
const defaultRight = "25";

function useMediaQuery(query: any) {
  const [matches, setMatches] = createSignal(window.matchMedia(query).matches);

  createEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", listener);

    onCleanup(() => {
      mediaQueryList.removeEventListener("change", listener);
    });
  });

  return matches;
}

function useVisualViewportWidthEn() {
  const [viewportWidth, setViewPortWidth] = createSignal(0);

  function handleResize() {
    setViewPortWidth(
      (window?.visualViewport?.width || 0) / 5 +
        (window?.visualViewport?.width || 0) / 14 || 0
    );
  }

  // Добавляем обработчик события изменения размеров окна просмотра
  window?.visualViewport?.addEventListener("resize", handleResize);

  // Вызываем обработчик сразу после подписки
  handleResize();

  // Отписываемся от обработчика при размонтировании компонента
  onCleanup(() => {
    window?.visualViewport?.removeEventListener("resize", handleResize);
  });

  return viewportWidth;
}

function useVisualViewportWidthArabic() {
  const [viewportWidth, setViewPortWidth] = createSignal(0);

  function handleResize() {
    setViewPortWidth(
      (3 * (window?.visualViewport?.width || 0)) / 5 +
        (window?.visualViewport?.width || 0) / 14 || 0 - 7
    );
  }

  // Добавляем обработчик события изменения размеров окна просмотра
  window?.visualViewport?.addEventListener("resize", handleResize);

  // Вызываем обработчик сразу после подписки
  handleResize();

  // Отписываемся от обработчика при размонтировании компонента
  onCleanup(() => {
    window?.visualViewport?.removeEventListener("resize", handleResize);
  });

  return viewportWidth;
}
export function useCheckURLChange() {
  const [pathname, setPathname] = createSignal(window.location.pathname);

  const checkPathname = () => {
    if (window.location.pathname !== pathname()) {
      setPathname(window.location.pathname);
    }
  };

  const interval = setInterval(checkPathname, 200);

  onCleanup(() => clearInterval(interval));

  return pathname;
}

export const BubbleButton = (props: Props) => {
  const windowWidth = useVisualViewportWidthEn();
  const pathName = useCheckURLChange();

  const isMainPage = pathName().split("/").length === 2;
  const locale = pathName().split("/")[1];

  // const [helperName, setHelperName] = createSignal<string>(
  //   props.helperMessage ?? "No message"
  // );
  const helperName =
    locale === "kk"
      ? "Көмекші"
      : locale === "ru"
      ? "Помощник"
      : locale === "ar"
      ? "مساعد"
      : locale === "en-US"
      ? "Assistant"
      : locale === "en"
      ? "Assistant"
      : locale === "en-AE"
      ? "Assistant"
      : locale === "ar-AE"
      ? "مساعد"
      : locale === "ko"
      ? "보조"
      : "Assistant";

  const isArabic = locale === "ar";
  const isKorean = locale === "ko";
  const isKazakh = locale === "kk";
  const isEnglish = locale === "en";

  const buttonMenuArabic = useVisualViewportWidthArabic();

  const isLargeSize = useMediaQuery("(min-width: 640px)");
  let botRef: HTMLElement | null;

  createEffect(() => {
    const handleClickOutside = (event: any) => {
      if (botRef && !botRef.contains(event.target) && props.isBotOpened) {
        props.closeBot();
      }
    };

    // Adding the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  return (
    <>
      {isLargeSize() ? (
        <button
          part="button"
          onClick={() => props.toggleBot()}
          class={`fixed rounded-full  transition-transform duration-200 flex justify-center items-center animate-fade-in w-[60px] h-[60px]`}
          style={{
            "background-color": props.backgroundColor ?? defaultButtonColor,
            "z-index": 1201,
            "box-shadow": "0 5px 4px 0 rgba(0, 0, 0, .26)",
            "border-radius": "34px 8px 34px 34px",
            // right: isArabic ? `auto` : `${defaultRight}px`,
            // bottom: `${defaultBottom}px`,
            // // left: !isArabic ? `auto` : `${defaultRight}px`,
            // right: props.right
            //   ? `${props.right.toString()}px`
            //   : `${defaultRight}px`,
            right: props.right
              ? `${props.right.toString()}px`
              : `${defaultRight}px`,
            bottom: isArabic ? "20px" : `${defaultBottom}px`,
          }}
        >
          <Show when={props.customIconSrc}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 40 40"
              class={
                `absolute duration-200 transition w-9 ` +
                (props.isBotOpened
                  ? "scale-0 -rotate-180 opacity-0"
                  : "scale-100 rotate-0 opacity-100")
              }
              fill="none"
            >
              <path
                d="M26.2925 9.62331L27.3844 6.34766H29.2818L30.3737 9.62331L33.6493 10.7152V12.6126L30.3737 13.7045L29.2818 16.9801H27.3844L26.2925 13.7045L23.0169 12.6126V10.7152L26.2925 9.62331Z"
                fill="#FFFCFF"
              />
              <path
                d="M29.9998 19.9972V31.6639H26.6664V19.9972H29.9998Z"
                fill="#FFFCFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.2286 9.99722H17.7709L23.388 31.6639H19.9445L18.6482 26.6639H11.3512L10.0549 31.6639H6.61133L12.2286 9.99722ZM12.2154 23.3305H17.7841L15.1916 13.3306H14.8079L12.2154 23.3305Z"
                fill="#FFFCFF"
              />
            </svg>
          </Show>

          <svg
            viewBox="0 0 24 24"
            style={{ fill: "white" }}
            class={
              `absolute duration-200 transition w-9 ` +
              (props.isBotOpened
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-180 opacity-0")
            }
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z"
            />
          </svg>
        </button>
      ) : (
        // <button part="button" onClick={() => props.toggleBot()}>
        <div
          class={`fixed  rounded-full  transition-transform duration-200 flex justify-center items-center animate-fade-in w-[25px] h-[25px] cursor-pointer`}
          style={{
            // "background-color": props.isBotOpened ? "#55BBEB" : "#577487",
            "z-index": 1201,
            right: isArabic
              ? `${buttonMenuArabic()}px`
              : props.right && !isArabic
              ? `${windowWidth()}px`
              : `${windowWidth()}px`,
            bottom: "27px",
            display:
              isMainPage ||
              pathName().includes("login") ||
              pathName().includes("programs") ||
              pathName().includes("assessment") ||
              localStorage.getItem("role") !== "student"
                ? "none"
                : "",
            padding: "10px",
          }}
          onClick={() => props.toggleBot()}
        >
          <Show when={props.customIconSrc}>
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class={
                `absolute duration-200 transition w-[30px] ` +
                (props.isBotOpened
                  ? "scale-0 -rotate-180 opacity-0"
                  : "scale-100 rotate-0 opacity-100")
              }
            >
              {/* <g id="Group">
                <g id="Group_2">
                  <path
                    id="Path"
                    d="M14.2061 12.0451C14.32 12.159 14.32 12.3436 14.2061 12.4575C14.0922 12.5714 13.9075 12.5714 13.7936 12.4575C13.6797 12.3436 13.6797 12.159 13.7936 12.0451C13.9075 11.9312 14.0922 11.9312 14.2061 12.0451"
                    stroke="#678AA1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_2"
                    d="M18.8731 12.0451C18.987 12.159 18.987 12.3436 18.8731 12.4575C18.7592 12.5714 18.5745 12.5714 18.4606 12.4575C18.3467 12.3436 18.3467 12.159 18.4606 12.0451C18.5745 11.9312 18.7592 11.9312 18.8731 12.0451"
                    stroke="#678AA1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_3"
                    d="M9.53957 12.0451C9.65348 12.159 9.65348 12.3436 9.53957 12.4575C9.42567 12.5714 9.241 12.5714 9.12709 12.4575C9.01319 12.3436 9.01319 12.159 9.12709 12.0451C9.241 11.9312 9.42567 11.9312 9.53957 12.0451"
                    stroke="#678AA1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_4"
                    d="M14 24.5L9.33333 19.8345V19.8333H5.83333C4.54417 19.8333 3.5 18.7892 3.5 17.5V5.83333C3.5 4.54417 4.54417 3.5 5.83333 3.5H22.1667C23.4558 3.5 24.5 4.54417 24.5 5.83333V17.5C24.5 18.7892 23.4558 19.8333 22.1667 19.8333H18.6667L14 24.4988"
                    stroke="#678AA1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g> */}
              <g id="Group">
                <g id="Group_2">
                  <path
                    id="Path"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0599 22.407L7.8004 24.5152V20.6687C5.25823 18.9315 3.60156 16.1758 3.60156 13.0457C3.60156 7.75017 8.32423 3.5 14.1016 3.5C19.8789 3.5 24.6016 7.75017 24.6016 13.0457C24.6016 18.3412 19.8789 22.5913 14.1016 22.5913C13.4027 22.5913 12.7214 22.526 12.0599 22.407Z"
                    stroke="#364954"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="Ai">
                    <path
                      id="Vector"
                      d="M17.4596 17.4974V10.8202H19.0333V17.4974H17.4596ZM18.2508 9.87249C18.0016 9.87249 17.7871 9.7899 17.6074 9.6247C17.4277 9.45661 17.3379 9.2552 17.3379 9.02045C17.3379 8.78281 17.4277 8.58139 17.6074 8.4162C17.7871 8.24811 18.0016 8.16406 18.2508 8.16406C18.5029 8.16406 18.7174 8.24811 18.8942 8.4162C19.0739 8.58139 19.1637 8.78281 19.1637 9.02045C19.1637 9.2552 19.0739 9.45661 18.8942 9.6247C18.7174 9.7899 18.5029 9.87249 18.2508 9.87249Z"
                      fill="#364954"
                    />
                    <path
                      id="Vector_2"
                      d="M9.76639 17.4967H8.04492L11.1792 8.59375H13.1702L16.3089 17.4967H14.5874L12.2095 10.4196H12.1399L9.76639 17.4967ZM9.82291 14.006H14.5178V15.3014H9.82291V14.006Z"
                      fill="#364954"
                    />
                  </g>
                </g>
              </g>
            </svg>

            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M14.8984 5.39776L15.488 3.62891H16.5125L17.1022 5.39776L18.871 5.98738V7.01196L17.1022 7.60158L16.5125 9.37043H15.488L14.8984 7.60158L13.1295 7.01196V5.98738L14.8984 5.39776Z"
                  fill="#FFFCFF"
                />
                <path
                  d="M16.9003 10.9997V17.2997H15.1003V10.9997H16.9003Z"
                  fill="#FFFCFF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.30384 5.59967H10.2967L13.3299 17.2997H11.4704L10.7704 14.5997H6.83002L6.13002 17.2997H4.27051L7.30384 5.59967ZM7.29668 12.7997H10.3038L8.90383 7.39967H8.69668L7.29668 12.7997Z"
                  fill="#FFFCFF"
                />
              </svg> */}
          </Show>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class={
              `absolute duration-200 transition w-[30px] ` +
              (props.isBotOpened
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-180 opacity-0")
            }
          >
            <g id="Messages, Chat/Messages, Chat">
              {/* <g id="Group">
                <g id="Group_2">
                  <path
                    id="Path"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 24.5L9.33333 19.8345V19.8333H5.83333C4.54417 19.8333 3.5 18.7892 3.5 17.5V5.83333C3.5 4.54417 4.54417 3.5 5.83333 3.5H22.1667C23.4558 3.5 24.5 4.54417 24.5 5.83333V17.5C24.5 18.7892 23.4558 19.8333 22.1667 19.8333H18.6667L14 24.4988"
                    fill="#55BBEB"
                  />
                  <path
                    id="Path_2"
                    d="M14.2061 12.0451C14.32 12.159 14.32 12.3436 14.2061 12.4575C14.0922 12.5714 13.9075 12.5714 13.7936 12.4575C13.6797 12.3436 13.6797 12.159 13.7936 12.0451C13.9075 11.9312 14.0922 11.9312 14.2061 12.0451"
                    stroke="#E9F0F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_3"
                    d="M18.8731 12.0451C18.987 12.159 18.987 12.3436 18.8731 12.4575C18.7592 12.5714 18.5745 12.5714 18.4606 12.4575C18.3467 12.3436 18.3467 12.159 18.4606 12.0451C18.5745 11.9312 18.7592 11.9312 18.8731 12.0451"
                    stroke="#E9F0F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_4"
                    d="M9.53957 12.0451C9.65348 12.159 9.65348 12.3436 9.53957 12.4575C9.42567 12.5714 9.241 12.5714 9.12709 12.4575C9.01319 12.3436 9.01319 12.159 9.12709 12.0451C9.241 11.9312 9.42567 11.9312 9.53957 12.0451"
                    stroke="#E9F0F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g> */}
              <g id="Group">
                <g id="Group_2">
                  <path
                    id="Path"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0599 22.407L7.8004 24.5152V20.6687C5.25823 18.9315 3.60156 16.1758 3.60156 13.0457C3.60156 7.75017 8.32423 3.5 14.1016 3.5C19.8789 3.5 24.6016 7.75017 24.6016 13.0457C24.6016 18.3412 19.8789 22.5913 14.1016 22.5913C13.4027 22.5913 12.7214 22.526 12.0599 22.407Z"
                    stroke="#55BBEB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="Ai">
                    <path
                      id="Vector"
                      d="M17.4596 17.4974V10.8202H19.0333V17.4974H17.4596ZM18.2508 9.87249C18.0016 9.87249 17.7871 9.7899 17.6074 9.6247C17.4277 9.45661 17.3379 9.2552 17.3379 9.02045C17.3379 8.78281 17.4277 8.58139 17.6074 8.4162C17.7871 8.24811 18.0016 8.16406 18.2508 8.16406C18.5029 8.16406 18.7174 8.24811 18.8942 8.4162C19.0739 8.58139 19.1637 8.78281 19.1637 9.02045C19.1637 9.2552 19.0739 9.45661 18.8942 9.6247C18.7174 9.7899 18.5029 9.87249 18.2508 9.87249Z"
                      fill="#55BBEB"
                    />
                    <path
                      id="Vector_2"
                      d="M9.76639 17.4967H8.04492L11.1792 8.59375H13.1702L16.3089 17.4967H14.5874L12.2095 10.4196H12.1399L9.76639 17.4967ZM9.82291 14.006H14.5178V15.3014H9.82291V14.006Z"
                      fill="#55BBEB"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>

          {/* <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 15C1.5 7.54416 7.54416 1.5 15 1.5V1.5C22.4558 1.5 28.5 7.54416 28.5 15V15C28.5 22.4558 22.4558 28.5 15 28.5V28.5C7.54416 28.5 1.5 22.4558 1.5 15V15Z"
                fill="#55BBEB"
              />
              <path
                d="M18.3984 9.39776L18.988 7.62891H20.0125L20.6022 9.39776L22.371 9.98738V11.012L20.6022 11.6016L20.0125 13.3704H18.988L18.3984 11.6016L16.6295 11.012V9.98738L18.3984 9.39776Z"
                fill="#FFF"
              />
              <path
                d="M20.4003 14.9997V21.2997H18.6003V14.9997H20.4003Z"
                fill="#FFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.8038 9.59967H13.7967L16.8299 21.2997H14.9704L14.2704 18.5997H10.33L9.63002 21.2997H7.77051L10.8038 9.59967ZM10.7967 16.7997H13.8038L12.4038 11.3997H12.1967L10.7967 16.7997Z"
                fill="#FFF"
              />
            </svg> */}
          <div>
            <span
              class={`text-xs leading-[16.8px] font-normal  absolute top-[29px] left-[-20px] whitespace-nowrap text-center text-[#30404A]`}
              style={{
                color: props.isBotOpened ? "#55BBEB" : "#30404A",
                "margin-left": isArabic
                  ? "16px"
                  : isKorean
                  ? "21px"
                  : isEnglish
                  ? "10px"
                  : isKazakh
                  ? "11px"
                  : "4px",
              }}
            >
              {helperName}
            </span>
          </div>
        </div>
        // </button>
      )}
    </>
  );
};
