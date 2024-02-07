import React, { useEffect } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LocalesConfig from "./Localization/LocalesConfig";
import { store } from "./Services/redux/store";
import { Provider } from "react-redux";
import Routes from "./Routes";

function App() {
  let lng = localStorage.getItem("preferredLanguage");
  let dir = localStorage.getItem("direction");

  useEffect(() => {
    if (!lng) {
      localStorage.setItem("preferredLanguage", "en");
    }
    if (!dir) {
      localStorage.setItem("direction", "ltr");
    }
  }, [lng, dir]);

  LocalesConfig(lng);

  return (
    <html dir={dir}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>{<Routes />}</DndProvider>
      </Provider>
    </html>
  );
}

export default App;
