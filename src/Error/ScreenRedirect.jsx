import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

//from chatgpt//
const ScreenRedirect = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Example: Redirect if screen width falls into tablet range (768px - 1024px)
      if (screenWidth >= 768 && screenWidth <= 1024) {
        navigate("/unsupported-device");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  return children;
};

export default ScreenRedirect;
