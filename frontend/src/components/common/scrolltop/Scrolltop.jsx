import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scrolltop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToPosition = window.innerHeight * 0.5;
    window.scrollTo(0, scrollToPosition);
  }, [pathname]);

  return null;
};

export default Scrolltop;
