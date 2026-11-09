type GalleryVideoProps = {
  src: string;
  alt: string;
  className: string;
};

export function GalleryVideo({ src, alt, className }: GalleryVideoProps) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      aria-label={alt}
      className={className}
    />
  );
}
