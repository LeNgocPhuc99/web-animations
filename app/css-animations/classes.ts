export const ui = {
  section: "scroll-mt-24",
  sectionLabel: "mb-3 flex items-center gap-3",
  sectionNum: "min-w-7 font-mono text-[11px] text-[#5b8dee]/75",
  sectionTitle: "m-0 text-2xl font-bold tracking-normal text-[#e8e8f0]",
  sectionDesc:
    "mb-5 max-w-3xl text-sm leading-7 text-[#85859a] [&_code]:font-mono [&_code]:text-[#5beeb4]",
  card: "overflow-hidden rounded-lg border border-white/10 bg-[#111118]",
  demoArea:
    "relative flex min-h-[162px] flex-wrap items-center justify-center gap-[18px] border-b border-white/10 px-8 py-10 max-sm:px-5 max-sm:py-7",
  demoFooter:
    "flex items-center justify-between gap-3 px-[18px] py-4 max-sm:flex-col max-sm:items-start",
  code: "min-w-56 flex-1 font-mono text-xs leading-7 text-[#85859a] [&_.c]:italic [&_.c]:text-[#85859a] [&_.k]:text-[#ee5b8d] [&_.p]:text-[#5b8dee] [&_.v]:text-[#5beeb4]",
  button:
    "shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-white/15 bg-transparent px-4 py-[7px] font-mono text-xs text-[#e8e8f0] transition hover:border-white/25 hover:bg-[#1a1a24] active:scale-[0.97]",
  stack: "flex flex-col items-center gap-2.5 text-center",
  caption: "font-mono text-[10px] text-[#85859a]",
} as const;

export const navLinkClass =
  "whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] text-[#85859a] transition hover:bg-[#1a1a24] hover:text-[#e8e8f0]";

export const sidebarLinkClass =
  "flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-[13px] text-[#85859a] transition hover:bg-[#1a1a24] hover:text-[#e8e8f0]";

export const pillClass =
  "rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-[#85859a]";

export const transformItemClass = "flex flex-col items-center gap-2.5 px-2 py-4";

export const transformBoxClass =
  "h-12 w-12 cursor-pointer rounded-lg border border-white/15 bg-[#1a1a24] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

export const transformLabelClass =
  "text-center font-mono text-[10px] leading-snug text-[#85859a]";

export const laneClass =
  "lane flex h-9 items-center gap-3 max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-1.5";

export const laneNameClass =
  "min-w-28 text-right font-mono text-[11px] text-[#85859a] max-sm:min-w-0 max-sm:text-left";

export const laneTrackClass =
  "relative h-9 flex-1 overflow-hidden rounded border border-white/10 bg-[#1a1a24] max-sm:w-full max-sm:flex-none";

export const laneBallClass =
  "lane-ball absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full";
