const locale = localStorage.getItem("i18nextLng");
export const helperName =
  locale === "kk"
    ? "Көмек"
    : locale === "ru"
    ? "Помощь"
    : locale === "ar"
    ? "مساعدة"
    : locale === "en-US"
    ? "Help"
    : locale === "en"
    ? "Help"
    : locale === "en-AE"
    ? "Help"
    : locale === "ar-AE"
    ? "مساعدة"
    : locale === "ko"
    ? "도움말"
    : "Help";
