import { DemoCard } from "../components";
import {
  ui,
  transformBoxClass,
  transformItemClass,
  transformLabelClass,
} from "../classes";

import LessonSection from "./LessonSection";

const TransformSection = () => {
  const boxes = [
    ["tfTranslate", "translateX", "(16px)"],
    ["tfScale", "scale", "(1.6)"],
    ["tfRotate", "rotate", "(135deg)"],
    ["tfSkew", "skewX", "(20deg)"],
    ["tfCombo", "translate +", "scale + rotate"],
  ];

  return (
    <LessonSection id="transform">
      <DemoCard
        code={`
          <span class="c">/* hover để xem từng transform */</span><br>
          <span class="k">.combo</span>:<span class="p">hover</span> {<br>
          &nbsp;&nbsp;<span class="p">transform</span>: <span class="v">translateY(-8px) scale(1.1) rotate(15deg)</span>;<br>
          }
        `}
      >
        <div className={ui.demoArea}>
          <div className="grid w-full grid-cols-5 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {boxes.map(([id, line1, line2]) => (
              <div className={transformItemClass} key={id}>
                <div className={transformBoxClass} id={id} />
                <div className={transformLabelClass}>
                  {line1}
                  <br />
                  {line2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default TransformSection;
