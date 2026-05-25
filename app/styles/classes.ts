export const ui = {
  section: "scroll-mt-24",
  sectionLabel: "mb-3 flex items-center gap-3",
  sectionNum: "min-w-7 font-mono text-xs text-primary/75",
  sectionTitle: "m-0 text-2xl font-bold tracking-normal text-text-base",
  sectionDesc: [
    "mb-5 max-w-3xl text-sm leading-7 text-text-muted [&_code]:font-mono [&_code]:text-success",
  ].join(" "),
  card: "overflow-hidden rounded-lg border border-white/10 bg-bg-main",
  demoArea: [
    "relative flex min-h-40.5  px-8 py-10 max-sm:px-5 max-sm:py-7",
    "flex-wrap items-center justify-center gap-4.5 border-b border-white/10",
  ].join(" "),
  demoFooter: [
    "flex items-center justify-between gap-3 px-4.5 py-4 max-sm:flex-col max-sm:items-start",
  ].join(" "),
  code: [
    "min-w-56 flex-1 font-mono text-xs leading-7 text-text-muted",
    "[&_.c]:italic [&_.c]:text-text-muted [&_.k]:text-secondary [&_.p]:text-primary [&_.v]:text-success",
    "[&_.fn]:text-green font-semibold"
  ].join(" "),
  button: [
    "shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-white/15 bg-transparent px-4 py-2",
    "font-mono text-xs text-text-base transition hover:border-white/25 hover:bg-bg-subtle active:scale-[0.97]",
  ].join(" "),
  stack: "flex flex-col items-center gap-2.5 text-center",
  caption: "font-mono text-[10px] text-text-muted",
} as const;

export const navLinkClass = [
  "whitespace-nowrap rounded-full px-3 py-1.5 text-md text-text-muted transition",
  "hover:bg-bg-subtle hover:text-text-base",
].join(" ");

export const pillClass = [
  "rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-text-muted",
].join(" ");

export const sidebarLinkClass = [
  "flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-xs text-text-muted",
  "transition hover:bg-bg-subtle hover:text-text-base",
];
