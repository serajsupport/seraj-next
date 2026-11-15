import Image from "next/image";
import { Parallax, Reveal } from "@/components/reveal";

export function FeatureImage({
  src,
  sizes = "(min-width: 1024px) 448px, 90vw",
  aspect = "aspect-[4/5]",
  className = "",
}: {
  src: string;
  sizes?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <Reveal variant="clip" className={className}>
      <div className={`relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${aspect}`}>
        <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[12%]">
          <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
        </Parallax>
      </div>
    </Reveal>
  );
}
