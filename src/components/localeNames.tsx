const locale = localStorage.getItem("i18nextLng");
export const helperName = 
    locale === "kk"
    ? "AI Көмекші"
    : locale === "ru"
    ? "AI Помощник"
    : locale === "ar"
    ? "AI مساعد"
    : locale === "en-US"
    ? "AI Assistant"
    : locale === "en"
    ? "AI Assistant"
    : locale === "en-AE"
    ? "AI Assistant"
    : locale === "ar-AE"
    ? "AI مساعد"
    : locale === "ko"
    ? "AI 보조"
    : "AI Assistant";
    