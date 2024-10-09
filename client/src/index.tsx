import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ThemeContextProvider,
  getVivoNewSkin,
  ColorScheme,
  Locale,
  RegionCode,
} from "@telefonica/mistica";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const misticaTheme = {
  skin: getVivoNewSkin(),
  colorScheme: "light" as ColorScheme,
  i18n: {
    locale: "pt-BR" as Locale,
    phoneNumberFormattingRegionCode: "pt" as RegionCode,
  },
};

root.render(
  <ThemeContextProvider theme={misticaTheme}>
    <App />
  </ThemeContextProvider>
);
