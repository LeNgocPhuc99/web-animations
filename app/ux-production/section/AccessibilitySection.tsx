import UxProductionSection from "./UxProductionSection";
import { uxAriaSnippet, uxReducedMotionSnippet } from "../data";

const AccessibilitySection = () => {
  return (
    <UxProductionSection id="accessibility">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
            Giảm motion
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
            <code dangerouslySetInnerHTML={{ __html: uxReducedMotionSnippet }} />
          </pre>
        </div>
        <div className="rounded-lg border border-white/10 bg-bg-main p-4">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
            ARIA live
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
            <code dangerouslySetInnerHTML={{ __html: uxAriaSnippet }} />
          </pre>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          [
            "Focus visible",
            "Dùng <code>:focus-visible</code> thay vì xoá outline. Người dùng bàn phím phải luôn biết mình đang ở đâu.",
          ],
          [
            "Tạm dừng, dừng, ẩn",
            "Animation lặp quá lâu phải có cách dừng. Không để motion chạy mãi khi không phục vụ tác vụ.",
          ],
          [
            "Ba lần chớp",
            "Tránh hiệu ứng nhấp nháy nhanh để giảm rủi ro với người nhạy cảm ánh sáng.",
          ],
          [
            "Bỏ qua điều hướng",
            "Cho người dùng bàn phím nhảy qua các vùng motion nặng để thao tác nhanh hơn.",
          ],
        ].map(([title, body]) => (
          <div
            className="rounded-lg border border-white/10 bg-bg-main p-4"
            key={title}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
              {title}
            </p>
            <p
              className="mt-2 leading-7 text-text-muted"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>
        ))}
      </div>
    </UxProductionSection>
  );
};

export default AccessibilitySection;

