import { Navbar, Section } from "~/components";
import { cn } from "~/lib/utils";
import { useActiveSection } from "~/hooks";
import { pillClass, sidebarLinkClass } from "~/styles/classes";

import ParticleSystemDemo from "./ParticleSystemDemo";

const sectionLinks = [
  ["overview", "Tổng quan"],
  ["anatomy", "Cấu trúc particle"],
  ["demo", "Demo tương tác"],
  ["tuning", "Tinh chỉnh"],
] as const;

const sectionIds = sectionLinks.map(([id]) => id);

const heroPills = [
  "Canvas 2D",
  "vòng lặp emitter",
  "vòng đời particle",
  "gió + trọng lực",
  "an toàn khi resize",
];

const anatomyRows = [
  {
    name: "kind",
    role: "Cho biết particle đang được update/draw theo nhánh nào.",
    note: "rain | water",
  },
  {
    name: "x / y",
    role: "Tọa độ hiện tại trên canvas.",
    note: "position",
  },
  {
    name: "vx / vy",
    role: "Vận tốc theo trục X/Y, tạo chuyển động mỗi frame.",
    note: "motion",
  },
  {
    name: "age / life",
    role: "Điều khiển vòng đời, giúp particle tự kết thúc và được xoá.",
    note: "cleanup",
  },
  {
    name: "opacity",
    role: "Làm mờ theo tuổi để particle biến mất tự nhiên.",
    note: "fade",
  },
  {
    name: "length / wobble",
    role: "Thuộc tính riêng cho từng kiểu, tạo bản sắc khác nhau cho hiệu ứng.",
    note: "style",
  },
] as const;

const tuningItems = [
  "Tăng `emitRate` để mật độ dày hơn, nhưng phải theo dõi `maxParticles`.",
  "Dùng `wind` âm cho mưa, hoặc gần 0 cho dòng nước chạy ngang.",
  "Giảm `life` để vòng lặp nhẹ hơn nếu canvas có nhiều particle cùng lúc.",
  "Reset mảng particle khi đổi mode để tránh trộn state giữa hai mô phỏng.",
] as const;

const emitSnippet = `<span class="k">const</span> <span class="p">emitCount</span> = <span class="fn">Math.round</span>(<span class="p">config.emitRate</span> * <span class="p">intensity</span>);

<span class="k">for</span> (<span class="k">let</span> <span class="p">i</span> = <span class="v">0</span>; <span class="p">i</span> &lt; <span class="p">emitCount</span> && <span class="p">particles.length</span> &lt; <span class="p">config.maxParticles</span>; <span class="p">i</span>++) {
  <span class="p">particles</span>.<span class="fn">push</span>(
    <span class="p">mode</span> === <span class="v">"rain"</span>
      ? <span class="fn">createRainParticle</span>(<span class="p">size</span>, <span class="p">config.wind</span>)
      : <span class="fn">createWaterParticle</span>(<span class="p">size</span>),
  );
}`;

const updateSnippet = `<span class="k">for</span> (<span class="k">let</span> <span class="p">i</span> = <span class="p">particles.length</span> - <span class="v">1</span>; <span class="p">i</span> &gt;= <span class="v">0</span>; <span class="p">i</span>--) {
  <span class="k">const</span> <span class="p">particle</span> = <span class="p">particles[i]</span>;

  <span class="k">if</span> (<span class="p">particle.kind</span> === <span class="v">"rain"</span>) {
    <span class="fn">updateRainParticle</span>(<span class="p">particle</span>, <span class="p">size</span>, <span class="p">config.wind</span>);
    <span class="fn">drawRainParticle</span>(<span class="p">ctx</span>, <span class="p">particle</span>);
  } <span class="k">else</span> {
    <span class="fn">updateWaterParticle</span>(<span class="p">particle</span>, <span class="p">size</span>);
    <span class="fn">drawWaterParticle</span>(<span class="p">ctx</span>, <span class="p">particle</span>);
  }

  <span class="k">if</span> (<span class="p">particle.age</span> &gt;= <span class="p">particle.life</span>) {
    <span class="p">particles.splice</span>(<span class="p">i</span>, <span class="v">1</span>);
  }
}`;

const ParticleSystemLab = () => {
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-bg-main font-sans text-sm leading-relaxed text-text-base">
      <Navbar
        links={sectionLinks}
        logo="Particle System"
        logoColor="bg-accent-orange"
      />

      <main className="mx-auto w-full max-w-295 px-6 pb-18 max-sm:px-4">
        <section className="relative overflow-hidden py-14 text-center">
          <div className="lab-hero-grid absolute inset-0" />
          <div className="relative z-10">
            <div className="lab-fade-0 mb-3.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-orange">
              // hệ hạt trên web
            </div>
            <h1 className="lab-fade-1 text-4xl font-extrabold tracking-tight text-text-base sm:text-5xl">
              Hệ hạt
              <br />
              trên <span className="text-accent-orange">web</span>
            </h1>
            <p className="lab-fade-2 mx-auto mt-5 max-w-3xl text-base leading-8 text-text-muted">
              Một lab tương tác để hiểu cách emitter, vòng đời particle và
              render loop kết hợp với nhau để tạo ra hiệu ứng tự nhiên.
            </p>
            <div className="lab-fade-3 mt-6 flex flex-wrap justify-center gap-2">
              {heroPills.map((pill) => (
                <span className={pillClass} key={pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-[250px_minmax(0,1fr)] items-start gap-8 max-lg:grid-cols-1">
          <aside
            aria-label="Mục lục Particle System"
            className="sticky top-21 rounded-lg border border-white/10 bg-bg-main p-3.5 max-lg:static"
          >
            <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
              Lộ trình học
            </p>
            <nav className="lab-section-list grid gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {sectionLinks.map(([id, label]) => (
                <a
                  className={cn(
                    sidebarLinkClass,
                    activeId === id && "is-active",
                  )}
                  href={`#${id}`}
                  key={id}
                >
                  <span className="font-mono text-[10px] text-accent-orange">
                    {id === "overview"
                      ? "01"
                      : id === "anatomy"
                        ? "02"
                        : id === "demo"
                          ? "03"
                          : "04"}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-13">
            <Section
              id="overview"
              num="01"
              title="Tổng quan"
              description="Particle system là một mô hình gồm một <code>emitter</code> sinh ra nhiều đối tượng nhỏ, mỗi đối tượng có vòng đời riêng và được update theo các luật đơn giản. Khi cộng lại, các particle tạo ra cảm giác tự nhiên như mưa, khói, tia nước, bụi, hay sparkle."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  [
                    "Emitter",
                    "Đối tượng sinh particle theo rate, vị trí và bối cảnh.",
                  ],
                  [
                    "Particle",
                    "Mỗi hạt có position, velocity, opacity và lifetime riêng.",
                  ],
                  [
                    "Renderer",
                    "Mỗi frame sẽ update, draw rồi loại particle đã hết life.",
                  ],
                ].map(([title, body]) => (
                  <div
                    className="rounded-lg border border-white/10 bg-bg-subtle p-4"
                    key={title}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
                      {title}
                    </p>
                    <p className="mt-2 leading-7 text-text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="anatomy"
              num="02"
              title="Cấu trúc particle"
              description="Module này tách mỗi particle thành một object nhỏ với một số thuộc tính cốt lõi. Bạn nên đọc các field này trước khi mở file update/draw, vì đây là mental model quan trọng nhất."
            >
              <div className="grid gap-3 md:grid-cols-2">
                {anatomyRows.map((row) => (
                  <div
                    className="rounded-lg border border-white/10 bg-bg-subtle p-4"
                    key={row.name}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-mono text-sm text-text-base">
                        {row.name}
                      </h3>
                      <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
                        {row.note}
                      </span>
                    </div>
                    <p className="mt-2 leading-7 text-text-muted">{row.role}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="demo"
              num="03"
              title="Demo tương tác"
              description="Dùng toolbar để đổi mode giữa mưa và nước, sau đó kéo thanh cường độ để thấy emitter thay đổi ngay lập tức. Đây là phần thực hành trực tiếp của mô hình particle system."
            >
              <ParticleSystemDemo initialMode="rain" />
            </Section>

            <Section
              id="tuning"
              num="04"
              title="Tinh chỉnh"
              description="Hiệu ứng particle thường không khó ở phần vẽ, mà khó ở chỗ giữ nó ổn định, nhẹ và có kiểm soát. Hai đoạn dưới đây cho thấy cách emit và cleanup đang diễn ra trong module hiện tại."
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="rounded-lg border border-white/10 bg-bg-subtle p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
                    Vòng lặp emit
                  </p>
                  <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
                    <code dangerouslySetInnerHTML={{ __html: emitSnippet }} />
                  </pre>
                </div>
                <div className="rounded-lg border border-white/10 bg-bg-subtle p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
                    Update + dọn dẹp
                  </p>
                  <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-text-muted">
                    <code dangerouslySetInnerHTML={{ __html: updateSnippet }} />
                  </pre>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-bg-subtle p-4">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent-orange">
                  Ghi chú tinh chỉnh
                </p>
                <ul className="mt-3 grid gap-2 leading-7 text-text-muted">
                  {tuningItems.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticleSystemLab;
