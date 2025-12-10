"use client";

import DesktopLoginView from "@/app/login/views/DesktopLoginView";
import MobileLoginView from "@/app/login/views/MobileLoginView";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ContentView() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url(/background.jpg)] bg-contain bg-top bg-no-repeat md:bg-cover md:bg-center">
      {isMobile ? <MobileLoginView /> : <DesktopLoginView />}
    </main>
  );
}
