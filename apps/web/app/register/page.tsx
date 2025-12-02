"use client";

import RegisterView from "@/app/register/views/RegisterView";
import MobileRegisterView from "@/app/register/views/MobileRegisterView";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Page() {
  const isMobile = useMediaQuery("(min-width: 767px)");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url(/background.jpg)] bg-contain bg-top bg-no-repeat md:bg-cover md:bg-center">
      {isMobile ? <RegisterView /> : <MobileRegisterView />}
    </main>
  );
}
