import { memo } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { ScrollToTop } from "@common/Components";

const LayoutDefault = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default memo(LayoutDefault);
