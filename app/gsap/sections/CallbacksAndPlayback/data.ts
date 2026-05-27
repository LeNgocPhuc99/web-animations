const callbacksTabs = [
  { label: "callbacks", value: "callbacks" },
  { label: "playback control", value: "playback control" },
  { label: "delay & repeat", value: "delay & repeat" },
] as const;

type CallbackTab = (typeof callbacksTabs)[number]["value"];

const panelTabsCode: Record<CallbackTab, string> = {
  callbacks: ``,
  "delay & repeat": ``,
  "playback control": ``,
};

export { callbacksTabs, panelTabsCode };
export type { CallbackTab };
