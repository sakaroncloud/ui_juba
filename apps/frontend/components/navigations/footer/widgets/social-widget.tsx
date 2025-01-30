import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = {
  facebook_link: "https://www.facebook.com/hubahospitality",
  instagram_link: "https://www.instagram.com/hubahospitality",
  twitter_link: "https://twitter.com/hubahospitality",
  linkedin_link: "https://www.linkedin.com/company/huba-hospitality/",
};

type Props = {
  className?: string;
};

export const SocialMediaWidget = ({ className }: Props) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="widget__title">Follow us on</div>
      <div className="flex gap-3 items-center">
        {Object.entries(socialLinks).map(([key, value], index) => {
          return (
            <React.Fragment key={index}>
              {getSocialIcon(key, value as string)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const getSocialIcon = (platform: string, url: string) => {
  switch (platform) {
    case "facebook_link":
      return (
        <Link
          target="_black"
          href={url || "/"}
          className="p-3 bg-slate-100 rounded-full"
          aria-label="Open Facebook Profile Link"
        >
          <FaFacebookF className="size-4" />
        </Link>
      );

    case "instagram_link":
      return (
        <Link
          target="_black"
          href={url || "/"}
          className="p-3 bg-slate-100 rounded-full"
          aria-label="Open Instagram Profile Link"
        >
          <FaInstagram className="size-4" />
        </Link>
      );

    case "twitter_link":
      return (
        <Link
          target="_black"
          href={url || "/"}
          className="p-3 bg-slate-100 rounded-full"
          aria-label="Open Twitter Profile Link"
        >
          <FaXTwitter className="size-4" />
        </Link>
      );

    case "linkedin_link":
      return (
        <Link
          target="_black"
          href={url || "/"}
          className="p-3 bg-slate-100 rounded-full"
          aria-label="Open LinkedIn Profile Link"
        >
          <FaLinkedin className="size-4" />
        </Link>
      );
    default:
      break;
  }
};
