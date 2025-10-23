"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setCanInstall(false);
      setDeferredPrompt(null);
    }
  };

  if (!canInstall) return null;

  return (
    <div
      onClick={handleInstall}
      className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-[#3A3745] bg-[#e8e9ff] px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-slate-50 dark:bg-black dark:text-white dark:hover:bg-[#1A1823] sm:h-10 sm:gap-2.5 sm:px-4 sm:py-2 md:gap-3 md:px-5"
    >
      <Image src="/papers_logo.png" alt="Papers App" width={28} height={28} />
      <span className="text-sm font-semibold">Papers App</span>
      <Download className="h-4 w-4 md:hidden" />
    </div>
  );
};

export default PWAInstallButton;
