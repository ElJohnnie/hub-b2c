import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ThemeContextProvider,
  getVivoNewSkin,
  ColorScheme,
  Locale,
  RegionCode,
} from "@telefonica/mistica";
import AppController from "./pages/App/controllers/app.controller";

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
    <AppController />
  </ThemeContextProvider>
);
