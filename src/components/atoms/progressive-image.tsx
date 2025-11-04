"use client";

import Image, { ImageProps } from "next/image";
import { forwardRef, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Skeleton } from "./skeleton";
import { cn } from "@shared/lib/utils";

interface ProgressiveImageProps extends ImageProps {
  objectFit?: React.CSSProperties["objectFit"];
}

const NO_IMAGE_SRC = "/assets/img/placeholder.svg";

const validateSrc = (src: string | StaticImport) => {
  if (typeof src !== "string") {
    // console.error("Src must be a string");
    return NO_IMAGE_SRC;
  }
  if (
    !src.startsWith("/") &&
    !src.startsWith("http://") &&
    !src.startsWith("https://")
  ) {
    // console.error(`Invalid image src: ${src}`);
    return NO_IMAGE_SRC;
  }
  return src;
};

const ProgressiveImage = forwardRef<HTMLImageElement, ProgressiveImageProps>(
  (
    { alt, className, src = NO_IMAGE_SRC, objectFit = "cover", ...props },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(validateSrc(src));

    const handleImageError = () => {
      setCurrentSrc(NO_IMAGE_SRC);
      setIsLoaded(false);
    };

    return (
      <>
        {!isLoaded && <Skeleton className={className} />}
        <Image
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(className, {
            "absolute inset-0 invisible": !isLoaded,
          })}
          style={{ objectFit }}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          {...props}
        />
      </>
    );
  }
);

ProgressiveImage.displayName = "ProgressiveImage";

export { ProgressiveImage };
