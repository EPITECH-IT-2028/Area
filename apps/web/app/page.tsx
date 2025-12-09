"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl select-none">AREA</h1>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </main>
  );
}
