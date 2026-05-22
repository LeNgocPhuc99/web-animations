const tweenTabs = [
  { label: "gsap.to()", value: "gsap.to()" },
  { label: "gsap.from()", value: "gsap.from()" },
  { label: "gsap.fromTo()", value: "gsap.fromTo()" },
  { label: "so sánh", value: "so sánh" },
] as const;

type TweenTab = (typeof tweenTabs)[number]["value"];

const tweenPanelCode: Record<TweenTab, string> = {
  "gsap.to()": ``,
  "gsap.from()": ``,
  "gsap.fromTo()": ``,
  "so sánh": ``,
};

export { tweenTabs, tweenPanelCode };
export type { TweenTab };
