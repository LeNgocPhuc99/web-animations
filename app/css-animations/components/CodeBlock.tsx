import { ui } from "../classes";

const CodeBlock = ({ html }: { html: string }) => {
  return <div className={ui.code} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CodeBlock;
