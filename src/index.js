import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "@mantine/core/styles.css";

import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
