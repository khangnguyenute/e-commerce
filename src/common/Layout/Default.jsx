import { memo } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const LayoutDefault = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default memo(LayoutDefault);
