import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Shot = { slug: string; frame: "" | "-start" | "-end" };

const COLUMNS: Shot[][] = [
  [
    { slug: "saffron", frame: "" },
    { slug: "pistachios", frame: "-end" },
    { slug: "dried-figs", frame: "" },
    { slug: "pine-nuts", frame: "-start" },
  ],
  [
    { slug: "pine-nuts", frame: "" },
    { slug: "almonds", frame: "-end" },
    { slug: "saffron", frame: "-end" },
    { slug: "pistachios", frame: "" },
  ],
  [
    { slug: "almonds", frame: "" },
    { slug: "dried-figs", frame: "-end" },
    { slug: "pine-nuts", frame: "-end" },
    { slug: "saffron", frame: "-start" },
  ],
];

const ROW: Shot[] = [
  { slug: "saffron", frame: "" },
  { slug: "pistachios", frame: "-end" },
  { slug: "almonds", frame: "" },
  { slug: "dried-figs", frame: "-end" },
  { slug: "pine-nuts", frame: "" },
  { slug: "saffron", frame: "-end" },
  { slug: "pistachios", frame: "" },
  { slug: "almonds", frame: "-end" },
];

const FADE_Y = "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)";
const FADE_X = "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";

function ShotCard({ shot, hidden, sizes }: { shot: Shot; hidden: boolean; sizes: string }) {
  const tp = useTranslations("products");
  const name = tp(`${shot.slug}.name`);

  return (
    <Link
      href={`/products/${shot.slug}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group relative block aspect-[880/1168] overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
    >
      <Image
        src={`/products/${shot.slug}${shot.frame}.jpg`}
        alt={hidden ? "" : name}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold text-white">
        {name}
      </span>
    </Link>
  );
}

export function PhotoColumns({ className = "" }: { className?: string }) {
  return (
    <div
      className={`marquee-pause grid h-[40rem] grid-cols-3 gap-4 overflow-hidden ${className}`}
      style={{ maskImage: FADE_Y, WebkitMaskImage: FADE_Y }}
    >
      {COLUMNS.map((column, c) => (
        <div
          key={c}
          className={`marquee-y flex flex-col ${c === 1 ? "marquee-reverse" : ""}`}
          style={{ "--marquee-duration": `${52 + c * 9}s` } as CSSProperties}
        >
          {[0, 1].map((copy) =>
            column.map((shot) => (
              <div key={`${copy}-${shot.slug}${shot.frame}`} className="pb-4">
                <ShotCard shot={shot} hidden={copy === 1} sizes="200px" />
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  );
}

export function PhotoRow({ className = "" }: { className?: string }) {
  return (
    <div
      dir="ltr"
      className={`overflow-hidden ${className}`}
      style={{ maskImage: FADE_X, WebkitMaskImage: FADE_X }}
    >
      <div className="marquee-x flex w-max" style={{ "--marquee-duration": "44s" } as CSSProperties}>
        {[0, 1].map((copy) =>
          ROW.map((shot) => (
            <div key={`${copy}-${shot.slug}${shot.frame}`} className="w-40 shrink-0 pr-3">
              <ShotCard shot={shot} hidden={copy === 1} sizes="160px" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
