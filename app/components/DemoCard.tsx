import type { ReactNode } from "react";

import { ui } from "~/styles/classes";

import CodeBlock from "./CodeBlock";

const DemoCard = ({
  children,
  code,
  action,
}: {
  children: ReactNode;
  code: string;
  action?: ReactNode;
}) => {
  return (
    <div className={ui.card}>
      {children}
      <div className={ui.demoFooter}>
        <CodeBlock html={code} />
        {action}
      </div>
    </div>
  );
};

export default DemoCard;
