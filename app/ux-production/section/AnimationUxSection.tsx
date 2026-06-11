import UxProductionSection from "./UxProductionSection";
import { uxDurationRows, uxDecorativeItems, uxPurposefulItems } from "../data";

const AnimationUxSection = () => {
  return (
    <UxProductionSection id="animation-ux">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-green-400">
            Có mục đích
          </p>
          <div className="mt-3 grid gap-3">
            {uxPurposefulItems.map((item) => (
              <div
                className="rounded-md border border-white/10 bg-bg-subtle p-3"
                key={item.label}
              >
                <p className="font-mono text-xs text-text-base">{item.label}</p>
                <p className="mt-1 text-sm leading-7 text-text-muted">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-red-400">
            Trang trí
          </p>
          <div className="mt-3 grid gap-3">
            {uxDecorativeItems.map((item) => (
              <div
                className="rounded-md border border-white/10 bg-bg-subtle p-3"
                key={item.label}
              >
                <p className="font-mono text-xs text-text-base">{item.label}</p>
                <p className="mt-1 text-sm leading-7 text-text-muted">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-bg-main p-4">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
          <code>
            <span className="c">/* Trước khi thêm animation, hỏi 3 điều: */</span>
            {"\n"}
            <span className="c">// 1. Motion này giúp người dùng hiểu điều gì?</span>
            {"\n"}
            <span className="c">// 2. Nếu bỏ motion, người dùng có bị bối rối không?</span>
            {"\n"}
            <span className="c">// 3. Motion có làm chậm tác vụ của người dùng không?</span>
          </code>
        </pre>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {uxDurationRows.map(([range, note]) => (
          <div
            className="rounded-lg border border-white/10 bg-bg-main p-4"
            key={range}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
              {range}
            </p>
            <p className="mt-2 leading-7 text-text-muted">{note}</p>
          </div>
        ))}
      </div>
    </UxProductionSection>
  );
};

export default AnimationUxSection;

