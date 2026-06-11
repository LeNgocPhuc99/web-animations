import UxProductionSection from "./UxProductionSection";
import { uxPerformanceSnippet } from "../data";

const PerformanceSection = () => {
  return (
    <UxProductionSection id="performance">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            "CLS",
            "Animate transform thay vì top/left/width để tránh layout shift.",
          ],
          [
            "INP",
            "JS animation nặng trong handler sẽ làm tương tác chậm đi.",
          ],
          ["FPS", "Animate transform và opacity để giữ 60fps ổn định."],
        ].map(([metric, note]) => (
          <div
            className="rounded-lg border border-white/10 bg-bg-main p-4"
            key={metric}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
              {metric}
            </p>
            <p className="mt-2 leading-7 text-text-muted">{note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-bg-main p-4">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
          Quy trình audit
        </p>
        <div className="mt-3 grid gap-2 leading-7 text-text-muted">
          {[
            "Dùng tab Performance của Chrome để xem long task, layout shift và frame drop.",
            "Dùng Axe DevTools để kiểm tra lỗi accessibility đến từ motion hoặc focus.",
            "Test thủ công bằng Tab, cài đặt reduced motion và mobile viewport.",
          ].map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-bg-main p-4">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
          Ghi chú hiệu năng
        </p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
          <code dangerouslySetInnerHTML={{ __html: uxPerformanceSnippet }} />
        </pre>
      </div>
    </UxProductionSection>
  );
};

export default PerformanceSection;

