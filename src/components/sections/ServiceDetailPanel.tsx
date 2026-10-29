import Image from "next/image";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/hooks/useDialogFocus";

export type ServiceId = "marketing" | "branding" | "programming" | "content";

type ServiceCopy = {
  number: string;
  name: string;
  eyebrow: string;
  heading: [string, string];
  description: string;
  tint: string;
};

const copy: Record<ServiceId, ServiceCopy> = {
  marketing: {
    number: "01",
    name: "Marketing",
    eyebrow: "THE 3MO METHOD / FIND THE SIGNAL",
    heading: ["First, find the", "real opportunity."],
    description:
      "We learn what matters to your audience and where your brand can make a difference—so the idea starts in the right place.",
    tint: "rgba(164, 239, 145, .34)",
  },
  branding: {
    number: "02",
    name: "Branding",
    eyebrow: "THE 3MO METHOD / SHAPE THE STORY",
    heading: ["Give the idea", "a clear identity."],
    description:
      "Our three perspectives come together to shape a distinctive brand and a clear direction people can recognize and remember.",
    tint: "rgba(113, 188, 112, .24)",
  },
  programming: {
    number: "03",
    name: "Programming",
    eyebrow: "THE 3MO METHOD / BUILD IT TO MOVE",
    heading: ["Turn the direction", "into a real experience."],
    description:
      "We build the digital tools and experiences that make the idea useful, accessible, and ready to grow.",
    tint: "rgba(164, 239, 145, .2)",
  },
  content: {
    number: "04",
    name: "Content",
    eyebrow: "THE 3MO METHOD / MAKE IT RESONATE",
    heading: ["Tell the story", "that moves people."],
    description:
      "We bring the brand to life with thoughtful content that connects the idea to the people it was made for.",
    tint: "rgba(231, 188, 113, .25)",
  },
};

type ServiceDetailPanelProps = {
  serviceId: ServiceId | null;
  onClose: () => void;
};

export default function ServiceDetailPanel({
  serviceId,
  onClose,
}: ServiceDetailPanelProps) {
  const isOpen = serviceId !== null;
  const activeId = serviceId ?? "marketing";
  const active = copy[activeId];
  const panelRef = useRef<HTMLElement | null>(null);
  useDialogFocus(isOpen, panelRef, onClose);
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-end bg-[#102511]/45" onClick={onClose}>
    <section
      ref={panelRef}
      onClick={(event) => event.stopPropagation()}
      id="service-detail-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
      tabIndex={-1}
      className={`relative mx-auto w-full flex h-[min(78svh,720px)] max-w-[1920px] flex-col border-t border-[#102511]/15 shadow-[0_-18px_70px_rgba(16,37,17,.12)] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:h-[min(78svh,680px)] ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{
        background: `linear-gradient(112deg, rgba(248,247,242,.98) 0%, ${active.tint} 100%)`,
      }}
    >
      <button
        type="button"
        aria-label="Close method step details"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className="absolute right-5 top-4 z-10 grid h-11 w-11 place-items-center border border-[#102511]/15 text-xl leading-none text-[#102511] transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71bc70] sm:right-8 md:right-10"
      >
        ×
      </button>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overscroll-contain overflow-y-auto px-5 py-8 sm:px-8 md:grid-cols-[0.78fr_1.22fr] md:gap-7 md:px-10 md:py-8">
        <div className="max-w-[560px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#315c36]/70 sm:text-[11px]">
            {active.number} / {active.name}
          </p>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#102511]/45 sm:text-[11px]">
            {active.eyebrow}
          </p>
          <h2
            id="service-detail-title"
            className="mt-4 text-[clamp(27px,3.2vw,45px)] font-medium leading-[1.02] tracking-[-0.035em] text-[#102511]"
          >
            {active.heading[0]}
            <br />
            <span className="font-sans text-[#718168]">
              {active.heading[1]}
            </span>
          </h2>
          <p className="mt-4 max-w-[420px] text-xs leading-[1.55] text-[#102511]/60 sm:text-sm">
            {active.description}
          </p>
        </div>

        <div className="min-w-0 self-center">
          {activeId === "marketing" ? <MarketingVisual /> : null}
          {activeId === "branding" ? <BrandingVisual /> : null}
          {activeId === "programming" ? <ProgrammingVisual /> : null}
          {activeId === "content" ? <ContentVisual /> : null}
        </div>
      </div>

    </section>
    </div>,
    document.body,
  );
}

function MarketingVisual() {
  const pillars = [
    ["01 / STRATEGY", "Find the signal."],
    ["02 / CREATIVE", "Make it matter."],
    ["03 / PERFORMANCE", "Learn and improve."],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-[0.68fr_1.32fr] md:items-stretch">
      <ul className="grid grid-cols-3 gap-3 border-t border-[#102511]/15 pt-3 md:grid-cols-1 md:gap-1 md:border-l md:border-t-0 md:pl-5 md:pt-0">
        {pillars.map(([label, detail]) => (
          <li key={label} className="flex flex-col justify-center gap-1 py-1 md:border-b md:border-[#102511]/10 md:py-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.13em] text-[#102511]/45 sm:text-[11px]">
              {label}
            </span>
            <span className="text-[10px] font-medium text-[#102511] sm:text-xs">
              {detail}
            </span>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex min-h-[118px] flex-col justify-between bg-[#a4ef91] p-3 text-[#102511] sm:min-h-[150px] sm:p-4">
          <span className="font-sans text-[11px] tracking-[0.12em]">01 / SOCIAL</span>
          <strong className="text-[13px] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-xl">
            LOUD IS A<br />STRATEGY.
          </strong>
          <span className="self-end text-sm" aria-hidden="true">↗</span>
        </div>
        <div className="flex min-h-[118px] flex-col justify-between bg-[#102511] p-3 text-[#f3f0e7] sm:min-h-[150px] sm:p-4">
          <span className="font-sans text-[11px] tracking-[0.12em]">02 / OUTDOOR</span>
          <strong className="text-[13px] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-xl">
            TURN UP<br />THE VOLUME.
          </strong>
          <span className="self-end text-sm text-[#a4ef91]" aria-hidden="true">↗</span>
        </div>
        <div className="flex min-h-[118px] flex-col justify-between bg-[#d9ccf4] p-3 text-[#102511] sm:min-h-[150px] sm:p-4">
          <span className="font-sans text-[11px] tracking-[0.12em]">03 / MOTION</span>
          <strong className="text-[13px] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-xl">
            GOOD IDEAS<br />MOVE.
          </strong>
          <span className="self-end text-sm" aria-hidden="true">✦</span>
        </div>
      </div>
    </div>
  );
}

function BrandingVisual() {
  return (
    <div className="grid gap-2 sm:grid-cols-[0.72fr_1.28fr]">
      <div className="flex min-h-[150px] flex-col justify-between bg-[#d9ccf4] p-4 sm:min-h-[184px] sm:p-5">
        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#102511]/55 sm:text-[11px]">
          PRIMARY MARK / 01
        </span>
        <Image
          src="/logo/3mo-mark.png"
          alt="3Mo brand mark"
          width={205}
          height={112}
          className="h-12 w-24 object-contain object-left mix-blend-multiply sm:h-14 sm:w-28"
        />
        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#102511]/55 sm:text-[11px]">
          THREE - TWO / DONE
        </span>
      </div>
      <div className="flex min-h-[150px] flex-col justify-between border border-[#102511]/10 bg-[#f8f7f0]/80 p-4 sm:min-h-[184px] sm:p-5">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#102511]/45 sm:text-[11px]">
            PALETTE / 3MO SIGNATURE
          </p>
          <div className="mt-3 flex items-center gap-2" aria-label="Forest green, signal green, lime, and cream palette">
            <span className="h-4 w-4 rounded-full bg-[#102511]" />
            <span className="h-4 w-4 rounded-full bg-[#71bc70]" />
            <span className="h-4 w-4 rounded-full bg-[#a4ef91]" />
            <span className="h-4 w-4 rounded-full border border-[#102511]/10 bg-[#f3f0e7]" />
          </div>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-sans text-4xl leading-none tracking-[-0.035em] text-[#102511] sm:text-5xl">Aa</p>
            <p className="mt-2 text-[10px] font-semibold text-[#102511] sm:text-xs">DM Sans</p>
            <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#102511]/45 sm:text-[11px]">
              HEADLINE / DISPLAY
            </p>
          </div>
          <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#102511]/50 sm:text-[11px]">
            Clear by design
          </span>
        </div>
      </div>
    </div>
  );
}

function ProgrammingVisual() {
  return (
    <div className="grid gap-2 sm:grid-cols-[0.82fr_1.18fr]">
      <div className="min-h-[150px] bg-[#102511] p-3 text-[#f3f0e7] sm:min-h-[184px] sm:p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9aa83]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#e6d27e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#71bc70]" />
          </div>
          <span className="font-sans text-[11px] text-white/45">3mo.app / experience.ts</span>
        </div>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-[11px] leading-[1.65] text-[#f3f0e7]/85 sm:text-[11px]">
          <span className="text-[#a4ef91]">const</span> experience = <span className="text-[#a4ef91]">await</span> build({"{\n"}
          {'  '}goal: <span className="text-[#e7bc71]">&quot;make it useful&quot;</span>,{"\n"}
          {'  '}design: <span className="text-[#e7bc71]">&quot;feel like 3Mo&quot;</span>,{"\n"}
          {'  '}result: <span className="text-[#e7bc71]">&quot;ready to move&quot;</span>{"\n"}
          {"});"}
        </pre>
        <p className="mt-3 font-sans text-[11px] tracking-[0.08em] text-[#a4ef91]">
          ✓ BUILT WITH INTENT
        </p>
      </div>
      <div className="relative min-h-[150px] overflow-hidden bg-[#e2f4f4] p-4 text-[#102511] sm:min-h-[184px] sm:p-5">
        <div className="flex items-center gap-1 border-b border-[#102511]/10 pb-2 font-sans text-[11px] text-[#102511]/45">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e9aa83]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#e6d27e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#71bc70]" />
          <span className="ml-2">your-next-thing.com</span>
        </div>
        <p className="relative z-10 mt-5 text-[clamp(24px,2.3vw,38px)] font-medium leading-[1.02] tracking-[-0.035em]">
          HELLO
          <br />
          <span className="text-[#718168]">WORLD.</span>
        </p>
        <span
          aria-hidden="true"
          className="absolute -bottom-14 -right-10 h-36 w-36 rounded-full bg-[#a4ef91] sm:h-44 sm:w-44"
        />
        <span className="absolute bottom-4 left-4 z-10 font-sans text-[11px] uppercase tracking-[0.12em]">
          ENTER ↗
        </span>
      </div>
    </div>
  );
}

function ContentVisual() {
  return (
    <div className="grid gap-2 sm:grid-cols-[1.1fr_0.48fr_0.9fr]">
      <div className="flex min-h-[150px] flex-col justify-between bg-[#edbd72] p-4 text-[#102511] sm:min-h-[184px] sm:p-5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] uppercase tracking-[0.12em]">REEL / 01</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f8f7f0] text-xs" aria-hidden="true">▶</span>
        </div>
        <strong className="text-[clamp(19px,2vw,30px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          SHOW<br />THE GOOD
        </strong>
        <span className="font-sans text-[11px] tracking-[0.1em]">00:14 / 00:30</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        <div className="flex min-h-[70px] items-center bg-[#d9ccf4] p-3 text-[10px] font-medium leading-[1.02] tracking-[-0.035em] sm:min-h-0 sm:text-xs">
          THINK<br />BRIGHT
        </div>
        <div className="flex min-h-[70px] items-center bg-[#89c9d4] p-3 text-[10px] font-medium leading-[1.02] tracking-[-0.035em] sm:min-h-0 sm:text-xs">
          FEEL<br />MORE
        </div>
      </div>
      <div className="flex flex-wrap content-center gap-2 py-1 sm:pl-2">
        {["#social-first", "#stories-in-motion", "#good-energy"].map((tag) => (
          <span
            key={tag}
            className="border border-[#102511]/15 bg-[#f8f7f0]/55 px-2.5 py-2 font-sans text-[11px] tracking-[0.03em] text-[#102511]/70 sm:text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
