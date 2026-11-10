"use client";

import { useEffect, useRef } from "react";

type GalleryVideoProps = {
  src: string;
  alt: string;
  className: string;
  poster?: string;
};

export function GalleryVideo({ src, alt, className, poster }: GalleryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadSources = () => {
      video.src = src;
      if (poster) video.poster = poster;
    };

    if (typeof IntersectionObserver === "undefined") {
      loadSources();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadSources();
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [poster, src]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      preload="none"
      aria-label={alt}
      className={className}
    />
  );
}
