import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "./Navbar";

export default function NavbarContainer() {
  const [includeNavbar, setIncludeNavbar] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (router.latestLocation.href.includes("auth")) {
      setIncludeNavbar(false);
    }
  }, [router.latestLocation]);

  if (!includeNavbar) {
    return <Sidebar></Sidebar>;
  }

  return <Navbar />;
}
