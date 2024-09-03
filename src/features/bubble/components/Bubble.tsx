import {
  createEffect,
  createRenderEffect,
  createSignal,
  onCleanup,
  Show,
  splitProps,
} from "solid-js";
import styles from "../../../assets/index.css";
import { BubbleButton, useCheckURLChange } from "./BubbleButton";
import { BubbleParams } from "../types";
import { Bot, BotProps } from "../../../components/Bot";
import { AybjaxData } from "@/window";

export type BubbleProps = BotProps & BubbleParams;

function useVisualViewportHeight() {
  const [viewportHeight, setViewportHeight] = createSignal(0);

  function handleResize() {
    setViewportHeight(window?.visualViewport?.height || 0);
  }

  // Добавляем обработчик события изменения размеров окна просмотра
  window?.visualViewport?.addEventListener("resize", handleResize);

  // Вызываем обработчик сразу после подписки
  handleResize();

  // Отписываемся от обработчика при размонтировании компонента
  onCleanup(() => {
    window?.visualViewport?.removeEventListener("resize", handleResize);
  });

  return viewportHeight;
}
function useVisualViewportWidth() {
  const [viewportHeight, setViewportHeight] = createSignal(0);

  function handleResize() {
    setViewportHeight(window?.visualViewport?.width || 0);
  }

  // Добавляем обработчик события изменения размеров окна просмотра
  window?.visualViewport?.addEventListener("resize", handleResize);

  // Вызываем обработчик сразу после подписки
  handleResize();

  // Отписываемся от обработчика при размонтировании компонента
  onCleanup(() => {
    window?.visualViewport?.removeEventListener("resize", handleResize);
  });

  return viewportHeight;
}

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ["theme"]);

  let botRef: HTMLElement | null;

  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
    const width = useVisualViewportWidth();
    if (width() < 768) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeBot = () => {
    setIsBotOpened(false);
    const width = useVisualViewportWidth();
    if (width() < 768) {
      document.body.style.overflow = "visible";
    }
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };
  const locale = localStorage.getItem("i18nextLng") ?? "kk";
  const isArabic = locale === "ar";

  const [windowHeight, setWindowHeight] = createSignal(window.innerHeight);
  const [windowWidth, setWindowWidth] = createSignal(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  });
  const isLargeSize = windowWidth() > 768;

  const viewPort = useVisualViewportHeight();
  const width = useVisualViewportWidth();
  const pathName = useCheckURLChange();
  const element = document.getElementsByTagName("flowise-chatbot")[0];

  createEffect(() => {
    if (pathName() === "/dashboard" || pathName().includes("passing")) {
      element.setAttribute("style", "display:none");
    } else {
      element.setAttribute("style", "display:block");
    }
  }, [pathName()]);

  return (
    <>
      <style>{styles}</style>
      <BubbleButton
        {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        closeBot={closeBot}
        isBotOpened={isBotOpened()}
      />
      {/* "calc(100% - 59px)", */}
      <div
        part="bot"
        style={{
          height: isLargeSize
            ? viewPort() < 500
              ? viewPort() - 20 + "px"
              : viewPort() > 500
              ? "443px"
              : viewPort() - 75 + "px"
            : viewPort() - 59 + "px",
          // bubbleProps.theme?.chatWindow?.height && isLargeSize
          //   ? `${bubbleProps.theme?.chatWindow?.height.toString()}px`
          //   : "calc(100% - 59px)",
          "border-radius": isLargeSize ? "16px" : "0",
          transition:
            "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out",
          "transform-origin": "bottom right",
          transform: isBotOpened() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
          "box-shadow": "rgb(0 0 0 / 16%) 0px 5px 40px",
          "background-color":
            bubbleProps.theme?.chatWindow?.backgroundColor || "#ffffff",
          "z-index": 42424242,

          // right: width() < 768 ? "0" : isArabic ? "auto" : "20px",
          // left: width() < 768 ? "0" : isArabic ? "20px" : "auto",
        }}
        class={
          `fixed  sm:right-5 w-full sm:w-[400px]` +
          (isBotOpened() ? " opacity-1" : " opacity-0 pointer-events-none") +
          (props.theme?.button?.size === "large" || isLargeSize
            ? !isArabic
              ? " bottom-[165px]"
              : " bottom-[90px]"
            : " bottom-[56px]")
          // `${!isArabic ? "right-5" : "left-auto"}` +
          // `${isArabic ? " right-5" : "left-auto"}`
        }
      >
        {/* <span>{viewPort()}</span> */}

        <Show when={isBotStarted()}>
          <Bot
            badgeBackgroundColor={
              bubbleProps.theme?.chatWindow?.backgroundColor
            }
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={
              bubbleProps.theme?.chatWindow?.poweredByTextColor
            }
            textInput={bubbleProps.theme?.chatWindow?.textInput}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            fontSize={bubbleProps.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            closeBot={closeBot}
            isBotOpened={isBotStarted()}
            toggleBot={toggleBot}
          />
        </Show>
      </div>
    </>
  );
};
