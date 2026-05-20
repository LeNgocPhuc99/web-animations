import {
  useId,
  useMemo,
  useState,
  useContext,
  createContext,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";

import { cn } from "~/lib/utils";

import "./tabs.css";

type TabValue = string;

type TabsContextValue = {
  activeValue: TabValue;
  baseId: string;
  setActiveValue: (value: TabValue) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used inside <Tabs>.");
  }

  return context;
};

type TabsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  defaultValue?: TabValue;
  onValueChange?: (value: TabValue) => void;
  value?: TabValue;
};

export const Tabs = ({
  children,
  className,
  defaultValue,
  onValueChange,
  value,
  ...props
}: TabsProps) => {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const activeValue = value ?? internalValue;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      baseId,
      setActiveValue: (nextValue) => {
        if (value === undefined) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
    }),
    [activeValue, baseId, onValueChange, value],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

type TabListProps = HTMLAttributes<HTMLDivElement>;

export const TabList = ({ className, ...props }: TabListProps) => {
  return <div className={className} role="tablist" {...props} />;
};

type TabItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: TabValue;
};

export const TabItem = ({
  children,
  className,
  onClick,
  value,
  ...props
}: TabItemProps) => {
  const { activeValue, baseId, setActiveValue } = useTabsContext();
  const active = activeValue === value;

  return (
    <button
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={active}
      className={cn("tab-item", className, active && "active")}
      id={`${baseId}-tab-${value}`}
      onClick={(event) => {
        setActiveValue(value);
        onClick?.(event);
      }}
      role="tab"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  value: TabValue;
};

export const TabPanel = ({
  children,
  className,
  value,
  ...props
}: TabPanelProps) => {
  const { activeValue, baseId } = useTabsContext();
  const active = activeValue === value;

  if (!active) {
    return null;
  }

  return (
    <div
      aria-labelledby={`${baseId}-tab-${value}`}
      className={className}
      id={`${baseId}-panel-${value}`}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  );
};

export const useTabs = useTabsContext;
