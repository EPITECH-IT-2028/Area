import type { Viewport } from "next";
import ContentView from "@/app/login/views/ContentView";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#261412" },
    { media: "(prefers-color-scheme: dark)", color: "#261412" },
  ],
};

export default function Page() {
  return <ContentView />;
}
