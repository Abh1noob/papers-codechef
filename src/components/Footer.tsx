import { Separator } from "./ui/separator";
import ccLogo from "../assets/codechef_logo.svg";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import meta_icon from "../assets/meta_icon.svg";
import x_twitter_icon from "../assets/x_twitter_icon.svg";
import meta_icon_dark from "../assets/meta_icon_dark.svg";
import x_twitter_icon_dark from "../assets/x_twitter_icon_dark.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mx-auto flex flex-col items-center justify-between gap-y-12 pt-12 md:w-full md:flex-row md:px-12">
      <div className="flex items-center">
        <h1 className="jost bg-gradient-to-r from-[#562EE7] to-[#FFC6E8] bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl">
          Papers
        </h1>
        <Separator orientation="vertical" className="mx-3 h-full min-h-20" />
        <div className="flex items-center">
          <Image
            src={ccLogo as HTMLImageElement}
            alt="codechef-logo"
            height={70}
            width={70}
          />
          <p className="jost text-2xl font-bold md:text-4xl">CodeChef-VIT</p>
        </div>
      </div>

      <p className="hidden text-xl md:block">Made with Love By Codechef-VIT</p>
      <div className="flex items-center gap-x-8">
        <a href="https://www.instagram.com/codechefvit/">
          <Instagram />
        </a>
        <a href="https://www.linkedin.com/company/codechefvit/">
          <Linkedin />
        </a>
        <a href="https://www.youtube.com/@CodeChefVIT">
          <Youtube />
        </a>
        <a href="https://www.facebook.com/codechefvit/">
          <Image
            src={meta_icon}
            alt="meta-icon"
            height={24}
            width={24}
            className="dark:hidden"
          />
        </a>

        <a href="https://www.facebook.com/codechefvit/">
          <Image
            src={meta_icon_dark}
            alt="meta-icon"
            className="hidden dark:block"
            height={24}
            width={24}
          />
        </a>
        <Link href="https://x.com/codechefvit">
          <Image
            src={x_twitter_icon}
            alt="x_twitter_icon"
            className="dark:hidden"
            height={24}
            width={24}
          />
        </Link>

        <Link href="https://x.com/codechefvit">
          <Image
            src={x_twitter_icon_dark}
            alt="x_twitter_icon"
            className="mb-2 hidden dark:block"
            height={24}
            width={24}
          />
        </Link>
      </div>
      <p className="block text-xl md:hidden">Made with Love By Codechef-VIT</p>
    </div>
  );
}
