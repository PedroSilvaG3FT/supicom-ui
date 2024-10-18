"use client";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const updateDevice = () => {
    const width = window.innerWidth;

    setDevice({
      isMobile: width < 640,
      isDesktop: width > 1024,
      isTablet: width >= 641 && width < 1023,
    });
  };

  useEffect(() => {
    updateDevice();
    window.addEventListener("resize", updateDevice);

    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  return device;
};

export default useWindowSize;
