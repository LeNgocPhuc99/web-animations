import { ui } from "~/styles/classes";

const CodeBlock = ({ html }: { html: string }) => {
  return <div className={ui.code} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CodeBlock;
