import { selfURL } from "@shared/env";
import { Metadata } from "next";
import { headers } from "next/headers";

interface ConstructorOptions {
  title?: string;
  description?: string;
  image?: string;
  imageType?: string;
  imageSize?: number;
}

export async function openGraphConstructor({
  title,
  description,
  image = "/assets/logo.png",
  imageType = "image/png",
  imageSize = 540,
}: ConstructorOptions): Promise<Metadata> {
  const headersStore = await headers();
  const url = headersStore.get("x-pathname") || undefined;
  const siteName = selfURL ? new URL(selfURL).hostname : undefined;

  return {
    title,
    description,
    appleWebApp: { title },
    openGraph: {
      title,
      description,
      type: "website",
      siteName,
      locale: "ru_RU",
      alternateLocale: ["kk_KZ", "en_US"],
      images: {
        width: imageSize,
        height: imageSize,
        type: imageType,
        url: image,
      },
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: {
        width: imageSize,
        height: imageSize,
        type: imageType,
        url: image,
      },
    },
  };
}
