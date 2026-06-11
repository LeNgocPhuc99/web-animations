import UxProductionSection from "./UxProductionSection";
import { uxFeedbackPatterns, uxMotionTokens, uxPrinciples } from "../data";

const DesignSystemSection = () => {
  return (
    <UxProductionSection id="design-system">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
            Token thời lượng
          </p>
          <div className="mt-3 grid gap-2">
            {uxMotionTokens.map(([name, value]) => (
              <div
                className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-bg-subtle px-3 py-2"
                key={name}
              >
                <span className="font-mono text-xs text-text-base">{name}</span>
                <span className="font-mono text-xs text-text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
            Thang easing
          </p>
          <div className="mt-3 grid gap-2">
            {[
              "standard: cubic-bezier(0.4, 0, 0.2, 1)",
              "enter: cubic-bezier(0, 0, 0.2, 1)",
              "exit: cubic-bezier(0.4, 0, 1, 1)",
              "sharp: cubic-bezier(0.4, 0, 0.6, 1)",
            ].map((item) => (
              <div
                className="rounded-md border border-white/10 bg-bg-subtle px-3 py-2 font-mono text-xs text-text-muted"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {uxPrinciples.map(([title, note]) => (
          <div
            className="rounded-lg border border-white/10 bg-bg-main p-4"
            key={title}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
              {title}
            </p>
            <p className="mt-2 leading-7 text-text-muted">{note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-bg-main p-4">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
          Pattern phản hồi
        </p>
        <div className="mt-3 grid gap-2">
          {uxFeedbackPatterns.map(([title, note]) => (
            <div
              className="flex flex-col gap-1 rounded-md border border-white/10 bg-bg-subtle px-3 py-2"
              key={title}
            >
              <span className="font-mono text-xs text-text-base">{title}</span>
              <span className="text-sm leading-7 text-text-muted">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </UxProductionSection>
  );
};

export default DesignSystemSection;

