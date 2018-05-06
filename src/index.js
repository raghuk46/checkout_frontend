import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./redux/store/configureStore";

import App from "./App";

const store = configureStore();

const providerWrapper = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(providerWrapper, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    );
  });
}

// registerServiceWorker();
