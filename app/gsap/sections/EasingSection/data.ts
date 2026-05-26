const easeTabs = [
  { label: "ease families", value: "ease families" },
  { label: "race demo", value: "race demo" },
  { label: "special eases", value: "special eases" },
] as const;

type EasingTab = (typeof easeTabs)[number]["value"];

const easePanelCode: Record<EasingTab, string> = {
  "ease families": ``,
  "race demo": ``,
  "special eases": ``,
};

const easeFamily = {
  power: {
    variants: ["power0", "power1", "power2", "power3", "power4"],
    suffix: [".in", ".out", ".inOut"],
  },
  back: {
    variants: ["back"],
    suffix: [".in", ".out", ".inOut"],
    param: "(1.7)",
  },
  elastic: {
    variants: ["elastic"],
    suffix: [".in", ".out", ".inOut"],
    param: "(1,0.5)",
  },
  bounce: {
    variants: ["bounce"],
    suffix: [".in", ".out", ".inOut"],
  },
  expo: { variants: ["expo"], suffix: [".in", ".out", ".inOut"] },
  circ: { variants: ["circ"], suffix: [".in", ".out", ".inOut"] },
  sine: { variants: ["sine"], suffix: [".in", ".out", ".inOut"] },
  steps: { variants: ["steps(6)", "steps(12)"], suffix: [""] },
} as const;

type EasingFamily = keyof typeof easeFamily;

const getEaseVariants = (family: EasingFamily) => {
  const familyConfig = easeFamily[family];

  return familyConfig.variants.flatMap((variant) =>
    familyConfig.suffix.map((suffix) => {
      const params =
        "param" in familyConfig && familyConfig.param && suffix !== ""
          ? familyConfig.param
          : "";

      return `${variant}${suffix}${params}`;
    }),
  );
};

const raceEases = [
  "linear",
  "power1.out",
  "power2.out",
  "power3.out",
  "back.out(1.7)",
  "elastic.out(1,0.5)",
  "bounce.out",
];

const raceColors = [
  "#888",
  "#5b8dee",
  "#ee5b8d",
  "#5beeb4",
  "#eec85b",
  "#9b5bee",
  "#88ce02",
];

interface EaseFamilyCardData {
  name: string;
  desc: string;
  family: EasingFamily;
}

const easeFamilyCards: EaseFamilyCardData[] = [
  {
    name: "Power",
    desc: "0,1,2,3,4 — chuẩn nhất",
    family: "power",
  },
  {
    name: "Back",
    desc: "Overshoot nhẹ",
    family: "back",
  },
  {
    name: "Elastic",
    desc: "Rung đàn hồi",
    family: "elastic",
  },
  {
    name: "Bounce",
    desc: "Nảy như bóng",
    family: "bounce",
  },
  {
    name: "Expo",
    desc: "Rất nhanh",
    family: "expo",
  },
  {
    name: "Circ",
    desc: "Đường tròn",
    family: "circ",
  },
  {
    name: "Sine",
    desc: "Mềm mại nhất",
    family: "sine",
  },
  {
    name: "Steps",
    desc: "Nhảy bậc",
    family: "steps",
  },
] as const;

export {
  easeTabs,
  raceEases,
  easeFamily,
  raceColors,
  easePanelCode,
  easeFamilyCards,
  getEaseVariants,
};

export type { EasingTab, EasingFamily, EaseFamilyCardData };
