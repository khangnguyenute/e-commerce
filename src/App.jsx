import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LayoutDefault } from "./common/Layout";
import CommonRoutes from "./app/Routes/CommonRoutes";
import { DropdownProvider } from "./common/Components/Dropdown";
import { store } from "./app/store";

import "./locales/config";
import { Suspense } from "react";

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="loading">
        <BrowserRouter>
          <LayoutDefault>
            <CommonRoutes />
          </LayoutDefault>
        </BrowserRouter>
        <DropdownProvider />
        <ToastContainer />
      </Suspense>
    </Provider>
  );
};

export default App;
