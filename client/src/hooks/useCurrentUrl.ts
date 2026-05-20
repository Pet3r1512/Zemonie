import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const useCurrentUrl = () => {
  const [currUrl, setCurrUrl] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setCurrUrl(location.pathname);
  }, [location.pathname]);

  return { currUrl };
};
