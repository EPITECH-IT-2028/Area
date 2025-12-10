"use client";

import DesktopRegisterView from "@/app/register/views/DesktopRegisterView";
import MobileRegisterView from "@/app/register/views/MobileRegisterView";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ContentView() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url(/background.jpg)] bg-contain bg-top bg-no-repeat md:bg-cover md:bg-center">
      {isMobile ? <MobileRegisterView /> : <DesktopRegisterView />}
    </main>
  );
}
