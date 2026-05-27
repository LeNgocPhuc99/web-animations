const easeTabs = [
  { label: "ease families", value: "ease families" },
  { label: "race demo", value: "race demo" },
  { label: "special eases", value: "special eases" },
] as const;

type EasingTab = (typeof easeTabs)[number]["value"];

const easePanelCode: Record<EasingTab, string> = {
  "ease families": ``,
  "race demo": `
    <span class="c">// cùng duration=1.2s — ease khác nhau, cảm giác hoàn toàn khác</span><br>
    RACE_EASES.forEach(e => <span class="fn">gsap.to</span>(ball, { <span class="p">x</span>: <span class="v">maxX</span>, <span class="p">duration</span>: <span class="v">1.2</span>, <span class="p">ease</span>: e }));`,
  "special eases": `
    <span class="c">// elastic: amplitude (1), period (0.3) — period nhỏ = rung nhanh</span><br>
    <span class="p">ease</span>: <span class="s">'elastic.out(1, 0.3)'</span><br>
    <span class="c">// back: overshoot amount — số càng lớn càng vượt quá nhiều</span><br>
    <span class="p">ease</span>: <span class="s">'back.out(2.5)'</span><br>
    <span class="c">// steps: nhảy N bước — giống CSS steps(), dùng cho sprite anim</span><br>
    <span class="p">ease</span>: <span class="s">'steps(8)'</span><br>
    <span class="c">// none = linear, không có ease</span><br>
    <span class="p">ease</span>: <span class="s">'none'</span>`,
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

const easeSpecials = [
  {
    id: "se1",
    label: `elastic<br>param`,
    desc: "elastic.out(1, 0.3)",
    bg: "--color-gsap",
    gsapConfig: {
      x1: -80,
      x2: 80,
      duration: 1,
      easeFunc: "elastic.out(1,0.3)",
    },
  },
  {
    id: "se2",
    label: `back<br>param`,
    desc: "back.out(2.5)",
    bg: "--color-pink-400",
    gsapConfig: {
      x1: -80,
      x2: 80,
      delay: 0.1,
      duration: 0.8,
      easeFunc: "back.out(2.5)",
    },
  },
  {
    id: "se3",
    label: `steps<br>8`,
    desc: "steps(8)",
    bg: "--color-purple-400",
    gsapConfig: {
      x1: -80,
      x2: 80,
      delay: 0.2,
      duration: 1,
      easeFunc: "steps(8)",
    },
  },
  {
    id: "se4",
    label: `rough`,
    desc: "rough",
    bg: "--color-green-400",
    gsapConfig: {
      x1: -80,
      x2: 80,
      delay: 0.3,
      duration: 1.2,
      easeFunc: "rough({strength:2,points:20,randomize:true})",
    },
  },
  {
    id: "se5",
    label: `none<br>linear`,
    desc: "none (linear)",
    bg: "--color-yellow-400",
    gsapConfig: {
      x1: -80,
      x2: 80,
      delay: 0.4,
      duration: 0.8,
      easeFunc: "none",
    },
  },
] as const;

export {
  easeTabs,
  raceEases,
  easeFamily,
  raceColors,
  easeSpecials,
  easePanelCode,
  easeFamilyCards,
  getEaseVariants,
};

export type { EasingTab, EasingFamily, EaseFamilyCardData };
