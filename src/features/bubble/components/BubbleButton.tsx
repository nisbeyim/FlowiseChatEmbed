import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { isNotDefined } from "@/utils/index";
import { ButtonTheme } from "../types";
import { helperName } from "@/components/localeNames";

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
      (window?.visualViewport?.width || 0) / 4 +
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
      (2 * (window?.visualViewport?.width || 0)) / 4 +
        (window?.visualViewport?.width || 0) / 10 || 0 - 7
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

  const locale = localStorage.getItem("i18nextLng") ?? "kk";

  

  const isArabic = locale === "ar";

  const buttonMenuArabic = useVisualViewportWidthArabic();

  const isLargeSize = useMediaQuery("(min-width: 768px)");
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

  const pathName = useCheckURLChange();

  return (
    <div>
      {isLargeSize() ? (
        <button
          part="button"
          onClick={() => props.toggleBot()}
          class={`fixed rounded-full  transition-transform duration-200 flex justify-center items-center animate-fade-in w-[60px] h-[60px]`}
          style={{
            "background-color": props.backgroundColor ?? defaultButtonColor,
            "z-index": 3201,
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
        <button part="button" onClick={() => props.toggleBot()}>
          <div
            class={`fixed  rounded-full  transition-transform duration-200 flex justify-center items-center animate-fade-in w-[25px] h-[25px]`}
            style={{
              "background-color": props.isBotOpened ? "#55BBEB" : "#577487",
              "z-index": 3201,
              right: isArabic
                ? `${buttonMenuArabic()}px`
                : props.right && !isArabic
                ? `${windowWidth()}px`
                : `${windowWidth()}px`,
              bottom: "30px",
              display: pathName() === "/dashboard" ? "none" : "",
              padding: "10px",
            }}
          >
            <Show when={props.customIconSrc}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                class={
                  `absolute duration-200 transition w-5 ` +
                  (props.isBotOpened
                    ? "scale-0 -rotate-180 opacity-0"
                    : "scale-100 rotate-0 opacity-100")
                }
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
              </svg>
            </Show>

            <svg
              width="30"
              height="30"
              class={
                `absolute duration-200 transition w-5 ` +
                (props.isBotOpened
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-180 opacity-0")
              }
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
            </svg>
            <div>
              <span
                class={`text-xs leading-[16.8px] font-medium  absolute top-[29px] left-[-26px] whitespace-nowrap text-center text-[#678AA1]`}
                style={{
                  color: props.isBotOpened ? "#36A0D0" : "#678AA1",
                  "margin-left": isArabic ? "11px" : "3px",
                }}
              >
                {helperName}
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
