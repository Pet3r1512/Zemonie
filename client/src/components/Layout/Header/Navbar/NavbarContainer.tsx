import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function NavbarContainer() {
  const [includeNavbar, setIncludeNavbar] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (router.state.location.href.includes("auth")) {
      setIncludeNavbar(false);
    }
  }, [router.state.location]);

  if (!includeNavbar) {
    return null;
  }

  return <Navbar />;
}
